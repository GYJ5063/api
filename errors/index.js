const { createError } = require('apollo-errors');

const ForbiddenError = createError('ForbiddenError', {
    message: 'UnAuthorised request'
});

const UnknownError = createError('UnknownError', {
    message: 'An unknown error has occurred!  Please try again later'
});

const AuthenticationError = createError('AuthenticationError', {
    message: 'Must be logged in.'
});

const ForbiddenErrorForRole = (roleName) => {
    return createError('ForbiddenError', {
        message: `Requires ${roleName} role.`
    });
};

const ForbiddenErrorForPermission = (permission) => {
    return createError('ForbiddenError', {
        message: `Requires ${permission.action} ${permission.target} permission.`
    });
};

module.exports = {
    ForbiddenError,
    UnknownError,
    AuthenticationError,
    ForbiddenErrorForRole,
    ForbiddenErrorForPermission
};