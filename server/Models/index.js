const mongoose = require('mongoose');
require('dotenv').config();

const db = process.env.MONGODB_URI;
// const db = `mongodb+srv://valgaug:myfract74@myfractals.so9obsd.mongodb.net/?retryWrites=true&w=majority`;
// const db = `mongodb+srv://valgaug:${process.env.DB_PASSWORD}@myfractals.so9obsd.mongodb.net/?retryWrites=true&w=majority`;
// const db = 'mongodb://127.0.0.1:27017/imagesDB';

mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

module.exports = mongoose;
