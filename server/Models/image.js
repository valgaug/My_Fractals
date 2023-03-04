'use strict';

const mongoose = require('.');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  data: Buffer,
  contentType: String,
});

const User = mongoose.model('image', imageSchema);

module.exports = User;
