'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('./config');

const router = express.Router();

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

router.post('/login', localAuth, function (req, res) {
  return res.json(req.user);
});

function createAuthToken (user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

module.exports = router;