const express = require("express");
const router = express.Router();

let User = require('../models/user.model');

// /profile/

router.get("/", (req, res, next) => {
  User.find()
  next();
});

module.exports = router;
