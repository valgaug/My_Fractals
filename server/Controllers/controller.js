'use strict';

const image = require('../Models/image');
const fs = require('fs');
const path = require('path');

exports.getImages = async (req, res) => {
  try {
    const buffer_images = await image.find();
    res.json({ message: 'hello from get images' });
    // const images = buffer_images.map((img) => Buffer.from(img.data, 'base64').toString('base64'));
    // res.send(images);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.postImage = async (req, res) => {
  try {
    let img = {
      data: fs.readFileSync(path.join(__dirname + '/../Images/' + req.file.filename)),
      contentType: 'image/png',
    };
    await image.create(img);
    res.send(JSON.stringify('Image Uploaded'));
  } catch (e) {
    res.sendStatus(500);
  }
};
