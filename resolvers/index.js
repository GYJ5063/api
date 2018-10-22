const { AuthenticationError } = require('apollo-server');
const db = require('../models');
const jwt = require('jsonwebtoken');

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

module.exports = {
    Query: {
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
        },
        books: () => books
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
                db.users.create(args)
                    .then(user => {
                        if(!user) {
                            reject('Error retrieving user');
                        }
                        resolve(user);
                    })
                    .catch(err => reject(err));
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