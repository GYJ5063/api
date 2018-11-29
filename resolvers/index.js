const { AuthenticationError } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');
const jwt = require('jsonwebtoken');
const passwordGenerator = require('generate-password');
const axios = require("axios");
const bugsnag = require('bugsnag');
const _ = require('lodash');
bugsnag.register('9dc7f221d3f8cbb50c70d0e1df02ceb3');

const { hasPermission, fromAllowedOrigin } = require('./access-control-layer');
const db = require('../models');

const sendEmail = (transporter, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            to,
            subject,
            html
        }, (err, info) => {
            if(err){
                console.error(err, info);
                reject(err);
            }
            console.log(info);
            resolve(info);
        });
    });
};

module.exports = {
    JSON: GraphQLJSON,
    Query: {
        leads: async (root, { company_id }, context) => {
            if(!company_id) {
                throw new Error('Must have a company');
            }

            const leads = await db.leads.findAll({ where: { company_id } });

            return leads;
        },
        report: async (root, { id }, context) => {
            const report = await db.reports.findOne({
                where: { id },
                include: [{ all: true}]
            });

            if (!report) {
                throw new Error('Report not found.');
            }

            const houseTypeNames = _.map(report.regional_housetype_price_10y, 'house_type');
            const regional_housetype_price_10y = {};
            _.forEach(houseTypeNames, htn => {
                regional_housetype_price_10y[htn] = _.find(report.regional_housetype_price_10y, { 'house_type': htn });
            });

            const outgoing = {
              id: report.id,
              company: report.company,
              address: report.address,
              selling_results: {
                predict_results: report.predict_results,
                regional_housetype_price_10y,
                sales_history_analyze: report.sales_history_analyze,
                query_info: report.query_info,
                local_property_type_statistic: report.local_property_type_statistic,
                national_avg_price_10y: report.national_avg_price_10y,
                comparable_properties: report.comparable_properties,
                regional_price_10y: report.regional_price_10y,
                predict_price_10y: report.predict_price_10y
              },
              rental_results: {
                rental_comparable_properties: report.rental_comparable_properties,
                rental_predict_price: report.predict_results.rental_predict_price
              }
            };

            return outgoing;
        },
        company: async (root, args, { origin }) => {
            const company = await db.companies.findOne({
                where: { valuation_url: origin }
            });

            if (!company) {
                throw new Error('company not found error');
            }

            return company;
        },
        profile: (root, { username, password }, { user }) => {
            return new Promise((resolve, reject) => {
                if(!user) {
                    reject('Not Authenticated');
                }

                db.users.find({
                    where: { id: user.id },
                    include: { model: db.companies, as: 'company' }

                })
                    .then(user => {
                        if(!user) {
                            throw new Error('user not found error');
                        }
                        resolve(user);
                    })
                    .catch(err => reject(err));
            });
        },
        addresses: fromAllowedOrigin.createResolver((root, { postcode }, { origin }) => {
            return new Promise((resolve, reject) => {
                db.addresses.findAll({ 
                    where: { 
                        postcode: postcode,
                        organisation_name: ''
                    }
                })
                .then(addresses => resolve(addresses))
                .catch(err => reject(err));
            });
        })
    },
    Mutation: {
        login: (root, { email, password }, { SECRET }) => {
            return db.users.find({ where: { email }})
                .then(user => {
                    return db.users.validPassword(password, user.password).then(valid => {
                        if(valid) {
                            const token = jwt.sign(
                                { user: { id: user.id, email: user.email }},
                                SECRET,
                                { expiresIn: '1y' });
                            return token;
                        }
                        throw new Error('password or username incorrect');
                    });

                });
        },
        forgotPassword: (root, { email }, { EMAIL_SECRET, transporter, url }) => {
            return new Promise((resolve, reject) => {
                db.users.find({ where: { email }})
                    .then(user => {
                        if(!user) {
                            reject('User with email provided not found');
                        }
                        // create token
                        const token = jwt.sign(
                            { user: user.id },
                            EMAIL_SECRET,
                            { expiresIn: '1h' });

                        const password_reset = { email, token, created_at: Date.now() };

                        db.password_resets
                            .findOrCreate({where: { email }, defaults: password_reset })
                            .spread((newPwr, created) => {
                                if (!created) {
                                    // reset token exists, update with new token, created_at
                                    db.password_resets
                                        .update(password_reset, { where: { email }})
                                        .then(updated => {
                                            if(!updated) {
                                                reject('error resetting password');
                                            }
                                            // send email
                                            const resetUrl = `${url}reset/${password_reset.token}`;
                                            const html = `Please click this email to set new password <a href="${resetUrl}">${resetUrl}</a>`;

                                            sendEmail(transporter, user.email, 'Set new password', html)
                                                .then(() => resolve(`Password reset link sent to ${user.email}`))
                                                .catch(err => {
                                                    console.error(err);
                                                    resolve(`Password reset link sent to ${user.email}`);
                                                });
                                        })
                                        .catch(err => reject(err));
                                } else {
                                    // new password_reset created, send email
                                    const resetUrl = `${url}reset/${newPwr.token}`;
                                    const html = `Please click this email to set new password <a href="${resetUrl}">${resetUrl}</a>`;

                                    sendEmail(transporter, user.email, 'Set new password', html)
                                        .then(() => resolve(`Password reset link sent to ${user.email}`))
                                        .catch(err => {
                                            console.error(err);
                                            resolve(`Password reset link sent to ${user.email}`);
                                        });
                                }
                            })
                            .catch(err => reject(err));
                    })
                    .catch(err => reject(err));
            });
        },
        verifyToken: (root, { token }, context) => {
            console.log('user from the context is: ', context.user);
            return new Promise((resolve, reject) => {
                db.password_resets.find({ where: { token }})
                    .then(pwr => {
                        if(pwr) {
                            try {
                                // token exists, verify it hasn't expired
                                const { user } = jwt.verify(token, context.EMAIL_SECRET);
                                resolve(true);
                            } catch (error) {
                                console.error(error);
                                resolve(false);
                            }
                        } else {
                            resolve(false);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        resolve(false);
                    });
            });
        },
        resetPassword: (root, { token, password, confirmPassword }, context) => {
            return new Promise((resolve, reject) => {
                module.exports.Mutation
                    .verifyToken(root, { token }, context)
                    .then(valid => {
                        if(!valid){
                            // this would only happen if the token expired after page rendered
                            throw new Error('token not valid');
                        }
                        if(password !== confirmPassword) {
                            // already checked on the front end but just to be safe
                            throw new Error('Passwords do not match');
                        }

                        try {
                            const { user } = jwt.verify(token, context.EMAIL_SECRET);

                            // token valid, passwords match, update password
                            const userToUpdate = { password: password };
                            db.users
                                .update(userToUpdate, { where : { id: user }, individualHooks: true })
                                .then(updated => {
                                    if(!updated) {
                                        reject('Error updating password');
                                    }
                                    resolve('password updated :)');
                                })
                                .catch(err => {
                                    console.error(err);
                                    reject('Error updating password')
                                });
                        } catch (error) {
                            // token became invalid
                            console.error(error);
                            throw new Error('token not valid');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        reject('token not valid');
                    });
            });
        },
        createUser: hasPermission({ action: 'create', target: 'user' }).createResolver((root, args, context) => {
            // TODO: see if this method can be simplified using async/await
            return new Promise((resolve, reject) => {
                const { email, first_name, last_name,
                        company_name, company_telephone,
                        company_postcode, company_town, company_building_number } = args;

                const password = passwordGenerator.generate({
                    length: 10,
                    numbers: true
                });

                const user = { email, first_name, last_name, password };

                if(company_name) {
                    // see if company exists
                    db.companies.find({ where: { name: company_name }})
                    .then(company => {
                        if(!company) {

                            // company doesn't exist, check if mandatory fields are present
                            if(!company_telephone || !company_postcode || !company_town || !company_building_number) {
                                reject('New companies must also have a telephone and address');
                            }

                            // new company to create
                            const newCompany = {
                                name: company_name,
                                telephone: company_telephone,
                                address: {
                                    postcode: company_postcode,
                                    town: company_town,
                                    building_number: company_building_number
                                }
                            };

                            // link company to user
                            user.company = newCompany;

                            db.users.create(
                                    user,
                                    { include: [{
                                        association: db.users.company,
                                        include:  [ db.companies.address ]
                                    }] })
                                .then(user => {
                                    if(!user) {
                                        reject('Error creating user')
                                    }
                                    // send new user email to set password
                                    module.exports.Mutation
                                        .forgotPassword(root, { email: user.email }, context)
                                        .then(success => resolve(user));
                                })
                                .catch(err => reject(err));;
                        }
                        else {
                            // company exists, link company
                            user.company_id = company.id;

                            db.users.create(user)
                            .then(user => {
                                if(!user) {
                                    reject('Error creating user')
                                }
                                // send new user email to set password
                                module.exports.Mutation
                                    .forgotPassword(root, { email: user.email }, context)
                                    .then(success => resolve(user));
                            })
                            .catch(err => reject(err));
                        }
                    });
                }
                else {
                    // no company supplied
                    db.users.create(user)
                    .then(user => {
                        if(!user) {
                            reject('Error creating user')
                        }
                        // send new user email to set password
                        module.exports.Mutation
                            .forgotPassword(root, { email: user.email }, context)
                            .then(success => resolve(user));
                    })
                    .catch(err => reject(err));
                }
            });
        }),
        getValuation: (root, { postcode, building_number, building_name,built_from, property_type, wall_type, number_habitable_rooms, total_floor_area }, context) => {
            return new Promise((resolve, reject) => {
                const config = {
                    headers: {
                        "Authorization": process.env.PRICEPREDICTION_TOKEN
                    }
                };
                const formData = {
                    postcode,
                    building_number,
                    building_name,
                    built_from,
                    property_type,
                    wall_type,
                    number_habitable_rooms,
                    total_floor_area,
                    "report": 1
                };
            console.log(formData);
                axios.post("https://api.housevault.co.uk/house_valuation/price_prediction/", formData, config)
                    .then(function (response) {
                        resolve(response.data);
                    })
                    .catch(function (error) {
                        console.error(error);
                        reject(new Error(error) );
                    });

            });
        },
        createCompany: (root, { name, telephone, postcode, town, building_number }, context) => {
            return new Promise((resolve, reject) => {
                const company = { name, telephone, address: { postcode, town, building_number }};
                db.companies.create(
                        company,
                        { include: [{ all: true}] })
                    .then(company => {
                        if(!company) {
                            reject('Error retrieving company');
                        }
                        resolve(company);
                    })
                    .catch(err => reject(err));
            });
        },
        createLead: (root, args, context) => {
            return new Promise((resolve, reject) => {
                db.leads.create(
                    args,
                    { include: [{ all: true}] })
                    .then(lead => {
                        if(!lead) {
                            reject('Error saving the lead');
                        }
                        resolve(lead);
                    })
                    .catch(err => reject(err));
            });
        },
        saveReport: (root, { report, company_id }, context) => {
            return new Promise((resolve, reject) => {
                const { selling_results, rental_results } = report;

                const regional_housetype_price_10y = Object.keys(selling_results.regional_housetype_price_10y).map(k => {
                    const ht = selling_results.regional_housetype_price_10y[k];
                    ht.house_type = k;
                    return ht;
                });

                const predict_results = { rental_predict_price: rental_results.rental_predict_price, ...selling_results.predict_results};

                const incoming = {
                    address_id: selling_results.query_info.address_id,
                    company_id: company_id,
                    comparable_properties: _.values(selling_results.comparable_properties),
                    rental_comparable_properties: _.values(rental_results.rental_comparable_properties),
                    sales_history_analyze: _.values(selling_results.sales_history_analyze),
                    regional_housetype_price_10y: regional_housetype_price_10y,
                    national_avg_price_10y: selling_results.national_avg_price_10y,
                    regional_price_10y: selling_results.regional_price_10y,
                    local_property_type_statistic: selling_results.local_property_type_statistic,
                    predict_price_10y: selling_results.predict_price_10y,
                    predict_results: predict_results,
                    query_info: selling_results.query_info
                };

                db.reports.create(incoming, { include: [{ all: true}] })
                    .then(report => {
                        if(!report) {
                            reject('Error saving report');
                        }
                        resolve(report.id);
                    })
                    .catch(err => {
                        console.error(err);
                        reject('Error saving report');
                    });
            });
        }
    }
};

