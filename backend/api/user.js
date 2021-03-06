const express = require("express");
const crypto = require("crypto");

const { responseBuilder } = require('../tools/apiResponseBuilder');
const { errorHandler } = require('../tools/errorHandler');

const router = express.Router();

let User = require('../models/user.model');

router.get('/', async (req, res) => {
    const userEmail = req.user;

    User.findOne({ email: userEmail })
        .then(user => {
            return responseBuilder(res, 200, {
                message: `${userEmail} profile.`,
                validator: {},
                error: {},
                data: {
                    email: user.email,
                    name: user.name || "",
                    mobile: user.mobile || "",
                    address: user.address || "",
                },
            })
        })
        .catch( (err) => {
            errorHandler(err);
            return responseBuilder(res, 200, {
                message: {},
                validator: {},
                error: err,
                data: {}
            });
        });
});

module.exports = router;