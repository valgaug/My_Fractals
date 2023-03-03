const mongoose = require('mongoose');

const db = 'mongodb://127.0.0.1:27017/imagesDB';

mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

module.exports = mongoose;
