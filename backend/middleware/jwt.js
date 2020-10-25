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

module.exports = {
    authenticateAccessToken,
}

