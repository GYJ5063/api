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
        createUser: (root, args, { user }) => {
            if(!user) {
                return new AuthenticationError('must be logged in');
            }

            // TODO: see if this method can be simplified using async/await
            return new Promise((resolve, reject) => {
                const { email, first_name, last_name, password,
                        company_name, company_telephone,
                        company_postcode, company_town, company_building_number } = args;

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
                                    resolve(user);
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
                                resolve(user);
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
                        resolve(user);
                    })
                    .catch(err => reject(err));;
                }
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