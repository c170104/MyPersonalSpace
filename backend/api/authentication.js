const express = require("express");
const crypto = require("crypto");

const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken, verifyRefreshToken } = require('../tools/jwt');
const { errorHandler } = require('../tools/errorHandler');
const { responseBuilder } = require('../tools/apiResponseBuilder');
const createError = require("http-errors");

const router = express.Router();

let User = require('../models/user.model');

// API ENDPOINTS

router.post("/register", async (req, res, next) => {
    // User.init();
    const {email, password} = req.body;

    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");

    const newUser = new User({
        email,
        salt,
        hash
    });

    await newUser
        .save()
        .then(() => {
            return responseBuilder(res, 200, {
                message: {},
                validator: {
                    message: `Successfully registered user ${email}.`,
                },
                error: {},
                data: {},
            });
        })
        .catch((err) => {
            return responseBuilder(res, 200, {
                message: {},
                validator: {
                    message: "Failed to create new User",
                },
                error: err.errors,
                data: {},
            });
        });   
});

router.post("/login", async (req, res) => {
    try {
        const user = await authenticate(req);
        if (user) {
            const accessToken = await createAccessToken(user.email);
            const refreshToken = await createRefreshToken(user.email);
            sendRefreshToken(res, refreshToken);
            sendAccessToken(res, accessToken);
            console.log(user.email + " successfully logged in.");
        } else {
            throw new Error("Failed to login");
        }
    } catch (error) {
        errorHandler({
            message: error.message,
            error
        })
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie('jwt-rf-tkn');
    res.send({"message" : "logged out."});
});

router.post("/refresh_token", async (req, res, next) => {
    const token = req.cookies['jwt-rf-tkn'];

    try {
        const payload = await verifyRefreshToken(token);
        if (!payload) return next(createError.Forbidden());

        const accessToken = await createAccessToken(payload.aud);
        const refreshToken = await createRefreshToken(payload.aud);

        sendRefreshToken(res, refreshToken);
        sendAccessToken(res, accessToken);

    } catch (error) {
        errorHandler({
            message: error.message,
        });
    }
});

async function authenticate(req)    {
    const {email, password} = req.body;

    const user = await User.findOne({"email": email}, 'email salt hash', (err, user) => {
        if (err) return errorHandler({"message": "Database error. Authenticate.", "error": err});

        return user;
    });

    if (!user) {
        throw new Error("Invalid email address.");
    }

    const salt = user.salt;
    const user_hash = user.hash;

    const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    
    if (hash === user_hash) 
        return user;
    else {
        throw new Error("Invalid password.");
    }
}

module.exports = router;

  