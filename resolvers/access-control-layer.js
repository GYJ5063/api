const { isInstance } = require('apollo-errors');
const { createResolver } = require('apollo-resolvers');

const _ = require('lodash');

const { ForbiddenError,
        UnknownError,
        AuthenticationError,
        ForbiddenErrorForRole,
        ForbiddenErrorForPermission
} = require('../errors');

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

const fromAllowedOrigin = baseResolver.createResolver((root, args, { origin }) => {
    const { ROOT_URL_PRODUCTION, ROOT_URL_DEVELOPMENT} = process.env;
    if (!(origin === ROOT_URL_PRODUCTION || origin === ROOT_URL_DEVELOPMENT)) {
        throw new ForbiddenError();
    }
});

const hasPermission = ({ action, target }) => {
    return isAuthenticated.createResolver((root, args, context) => {
        const { roles } = context.user;

        const hasPerm = _.some(roles, role => {
            return _.some(role.permissions, permission => {
                return permission.action === action && permission.target === target;
            });
        });

        if(!hasPerm) {
            throw new (ForbiddenErrorForPermission({ action, target }));
        }
    });
};

module.exports = {
    isAuthenticated,
    isAdmin,
    hasRole,
    hasPermission,
    fromAllowedOrigin
};