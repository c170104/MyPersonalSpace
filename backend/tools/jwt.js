const { sign, verify } = require('jsonwebtoken');
const createError = require('http-errors');
const { errorHandler } = require('./errorHandler');

require('dotenv').config();

async function createAccessToken(userEmail)  {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '2h',
            issuer: 'myweb.com',
            audience: userEmail
        }

        sign(payload, secret, options, (error, token) => {
            if (error) {
                errorHandler({
                    message: "Access Token creation error.",
                    error
                });
                reject(createError.InternalServerError());
            }
            resolve(token);
        });
    });
}

async function createRefreshToken(userEmail)  {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '7d',
            issuer: 'myweb.com',
            audience: userEmail
        }

        sign(payload, secret, options, (error, token) => {
            if (error) {
                errorHandler({
                    message: "Refresh Token creation error.",
                    error
                });
                reject(createError.InternalServerError());
            }
            resolve(token);
        });
    });
}

function sendAccessToken(res, accessToken) {
    res.send({
        accessToken
    });
}

function sendRefreshToken(res, refreshToken)    {
    res.cookie('jwt-rf-tkn', refreshToken, {
        httpOnly: true,
        path: '/api/authentication/refresh_token'
    });
}

async function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        secret = process.env.JWT_REFRESH_TOKEN_SECRET;

        verify(token, secret, (error, userEmail) => {
            if (error) {
                errorHandler({
                    message: "Failed to authenticate refresh token.",
                    error,
                });
                reject(createError.Forbidden());
            }
            resolve(userEmail);
        });
    });
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    verifyRefreshToken,
}