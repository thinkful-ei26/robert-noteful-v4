'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const router = express.Router();

router.post('/', (req, res, next) => {
  const { username, password } = req.body;

  const newUser = { username, password };

  /***** Never trust users - validate input *****/
  if (!username) {
    const err = new Error('Missing `username` in request body');
    err.status = 400;
    return next(err);
  }

  User.hashPassword(password)
    .then(digest => {
      const newUser = {
        username,
        password: digest
      };
      return User.create(newUser);
    })
    .then(result => {
      res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Username name already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;