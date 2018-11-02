const { createError } = require('apollo-errors');

const ForbiddenError = createError('ForbiddenError', {
    message: 'Requires admin role'
});

const UnknownError = createError('UnknownError', {
    message: 'An unknown error has occurred!  Please try again later'
});

const AuthenticationError = createError('AuthenticationError', {
    message: 'Must be logged in.'
});

module.exports = {
    ForbiddenError,
    UnknownError,
    AuthenticationError
};