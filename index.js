const { ApolloServer } = require('apollo-server');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const config = require('./config/config.json');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = require('./schema/index.js');
const resolvers = require('./resolvers/index.js');

const env = process.env.NODE_ENV === 'production' ? 'production' : "development";
const { database, username, password, dialect, host } = config[env];

// TODO: need to update with real, secure values
const SECRET = 'keyboard_cat';
const EMAIL_SECRET = 'tetris_turtle';

const connection = new Sequelize(database, username, password, {
    dialect: dialect,
    host: host,
    define: {
        // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps
        timestamps: false
    }
});


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'email-goes-here',
        pass: 'password-goes-here'
    }
});


// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let user = null;
        let bearer = null;
        const token = req.headers.authorization;

        if(token) {
            try {
                bearer = jwt.verify(token, SECRET);
                user = bearer.user;
            } catch (error) {
                console.log(error);
            }
        }

        return { user, SECRET, EMAIL_SECRET, transporter };
    } 

});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});