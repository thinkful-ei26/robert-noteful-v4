'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);

router.post('/login', localAuth, function (req, res) {
  return res.json(req.user);
});

module.exports = router;