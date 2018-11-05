const { ApolloServer } = require('apollo-server');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const db = require('./models');
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
const SECRET = 'cEwwBZqmWEYWUjae0xV1u33FI8OpuyRDf6XZA7K4upvgXD9oZtoqAaJdaagl3RxuI0Ha47lNUW3YtsL7mIvkkSRfDkx0jDegL8pAC4J2xKzlINQdym6lifHqKGloj5f6';
const EMAIL_SECRET = '5SZgxowv54NYDstjO8tUSZahgmMRIzU2PCBd8lU3QctccIIHRwMIS7Wu4IvbZ4iWt17KfNqGeMuHdwTEOK7vnFsOC96bd8k7TpSQsCcFHLqDv7Wh8ykZ2jNXUTidYsrF';

// TODO: move this somewhere appropriate or get this dynamically
const url = 'http://localhost:8081/';

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
        user: 'noreply@housevault.co.uk',
        pass: 'lZX4bdyr4Q'
    },
    tls: {
        rejectUnauthorized: false
    }
});


// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        let bearer = null;
        const token = req.headers.authorization;

        if(token) {
            try {
                bearer = jwt.verify(token, SECRET);
                
                // exclude password
                // if we need the user's password wouldn't we require them to send it
                user = await db.users.find({
                    where: { id: bearer.user.id },
                    attributes: { exclude: ['password']},
                    include: [{
                        association: db.users.roles,
                        include: [ db.roles.permissions ]
                    }]
                });
            } catch (error) {
                console.log(error);
            }
        }

        return { user, SECRET, EMAIL_SECRET, transporter, url };
    } 

});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});