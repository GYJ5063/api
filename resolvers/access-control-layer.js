const { isInstance } = require('apollo-errors');
const { createResolver } = require('apollo-resolvers');

const { ForbiddenError, UnknownError, AuthenticationError} = require('../errors');

const baseResolver = createResolver(
    null,
    (root, args, context, error) => {
        if(isInstance(error)){
            return error;
        } else {
            console.error('non graphql error: ', error);
            throw new UnknownError();
        }
    }
);

const isAuthenticatedResolver = baseResolver.createResolver((root, args, context) => {
    if(!context.user) {
        throw new AuthenticationError();
    }

    // don't return from the resolver
    // so the request continues to next child resolver

});

const isAdminResolver = isAuthenticatedResolver.createResolver((root, args, context) => {
    if(!context.user.roles.contains('admin')) {
        throw new ForbiddenError();
    }

    // don't return from the resolver
    // so the request continues to next child resolver
});

module.exports = {
    isAuthenticatedResolver,
    isAdminResolver
};