const { isInstance } = require('apollo-errors');
const { createResolver } = require('apollo-resolvers');

const { ForbiddenError, UnknownError, AuthenticationError, ForbiddenErrorForRole} = require('../errors');

const baseResolver = createResolver(
    null,
    (root, args, context, error) => {
        if(isInstance(error)){
            return error;
        } else {
            // done to mask graphql errors being sent
            console.error('non graphql error: ', error);
            throw new UnknownError();
        }
    }
);

const isAuthenticated = baseResolver.createResolver((root, args, context) => {
    if(!context.user) {
        throw new AuthenticationError();
    }

    // don't return from the resolver
    // so the request continues to next child resolver

});

const hasRole = (role) => {
    return isAuthenticated.createResolver((roots, args, context) => {
        if(!context.user.roles.includes(role)) {
            throw new (ForbiddenErrorForRole(role));
        }
    });
};

const isAdmin = isAuthenticated.createResolver((root, args, context) => {
    if(!context.user.roles.includes('admin')) {
        throw new ForbiddenError();
    }

    // don't return from the resolver
    // so the request continues to next child resolver
});

module.exports = {
    isAuthenticated,
    isAdmin,
    hasRole
};