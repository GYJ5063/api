const { AuthenticationError } = require('apollo-server');
const db = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        leads: (root, {id}) => {
            return new Promise((resolve, reject) => {
                db.leads.findAll({
                    where: {
                        company_id: id
                    },
                    include: { model: db.companies }
                })
                .then(lead => {
                    if (!lead) {
                        throw new Error('lead not found error');
                    }
                    console.log(lead);
                    resolve(lead);
                })
                .catch(err => reject(err));
            });
        },
        profile: (root, { username, password }, { user }) => {
            return new Promise((resolve, reject) => {
                if(!user) {
                    reject('Not Authenticated');
                }

                db.users.find({
                    where: { id: user.id },
                    include: { model: db.companies }

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
        // this is for testing
        restrictedEndPoint: (root, args, { user }) => {
            if(!user) {
                return new AuthenticationError('restricted endpoint');
            }

            return 'Access to endpoint allowed, user is authenticated';
        }
    },
    Mutation: {
        login: (root, { email, password }, { SECRET }) => {
            return db.users.find({ where: { email }})
                .then(user => {
                    if(!user) {
                        throw new Error('user not found error');
                    }
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
        createUser: (root, args, context) => {
            return new Promise((resolve, reject) => {
                // TODO: clean up all this nesting with await/async
                const { email, first_name, last_name, password,
                        company_name, company_telephone,
                        company_postcode, company_town, company_building_number } = args;

                const user = { email, first_name, last_name, password };

                db.companies.find({ where: { name: company_name }})
                    .then(company => {
                        if(!company) {
                            const company = {
                                name: company_name,
                                telephone: company_telephone,
                                address: {
                                    postcode: company_postcode,
                                    town: company_town,
                                    building_number: company_building_number
                                }
                            };

                            user.company = company;

                            db.users.create(user, { include: [{ all: true}] })
                                .then(user => {
                                    if(!user) {
                                        reject('Error creating user')
                                    }
                                    resolve(user);
                                });
                        }
                        else {
                            user.company_id = company.id;
                            db.users.create(user)
                                .then(user => {
                                    if(!user) {
                                        reject('Error creating user')
                                    }
                                    resolve(user);
                                });
                        }
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
        }
    }
};