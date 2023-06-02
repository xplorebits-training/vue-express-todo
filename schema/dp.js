const mongoose = require('mongoose');

const dpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = dpSchema;
