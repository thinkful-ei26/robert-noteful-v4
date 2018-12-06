'use strict';

const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Add `createdAt` and `updatedAt` fields
tagSchema.set('timestamps', true);

tagSchema.index({ name: 1, userId: 1}, { unique: true });

// Transform output during `res.json(data)`, `console.log(data)` etc.
tagSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Tag', tagSchema);
