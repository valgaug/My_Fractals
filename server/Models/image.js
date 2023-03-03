'use strict';

const mongoose = require('.');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  author: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model('image', imageSchema);
// 'user' is the collections name which will be created adding an 's' at the end
// 'userSchema' is the Schema defined above

module.exports = User;
