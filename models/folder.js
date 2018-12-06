'use strict';

const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Add `createdAt` and `updatedAt` fields
folderSchema.set('timestamps', true);

folderSchema.index({ name: 1, userId: 1}, { unique: true });

// Transform output during `res.json(data)`, `console.log(data)` etc.
folderSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Folder', folderSchema);
