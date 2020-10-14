const { verify } = require('jsonwebtoken');
const createError = require('http-errors');
const { errorHandler } = require('../tools/errorHandler');

require('dotenv').config();

// Middleware used to authenticate Json Web Token (Access Token)
function authenticateAccessToken(req, res, next)  {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (token == null) return next(createError.Unauthorized());

    verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error)    {
            errorHandler({
                message: "Failed to authenticate access token.",
                error
            });
            return next(createError.Forbidden());
        }
        req.user = payload.aud;
        next();
    });
}

function authenticateRefreshToken(req, res, next)   {
    const rfToken = req.cookies["jwt-rf-tkn"];

    if (!rfToken) return next(createError.Unauthorized());

    verify(rfToken, process.env.JWT_REFRESH_TOKEN_SECRET, (error, user) => {
        if (error)    {
            errorHandler({
                message: "Failed to authenticate refresh token.",
                error
            });
            // redirect to login?
            return next(createError.Forbidden());
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateAccessToken,
    authenticateRefreshToken
}

