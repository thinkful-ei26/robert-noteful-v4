'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

const router = express.Router();

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

mongoose.connect(MONGODB_URI)
  .then(() => {



    router.get('/', (req, res, next) => {
      const { searchTerm, folderId, tagId, userId } = req.query;
    
      let filter = {};
    
      if (searchTerm) {
        const re = new RegExp(searchTerm, 'i');
        filter.$or = [{ 'title': re }, { 'content': re }];
      }
    
      if (folderId) {
        filter.folderId = folderId;
      }
    
      if (tagId) {
        filter.tags = tagId;
      }
    
      Note.find(filter)
        .populate('tags')
        .sort({ updatedAt: 'desc' })
        .then(results => {
          console.log(results);
        })
        .catch(err => {
          console.log(err); 
        });
    });

  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });