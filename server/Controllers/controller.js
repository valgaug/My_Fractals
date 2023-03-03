'use strict';

const image = require('../Models/image');

exports.getImages = async (req, res) => {
  try {
    const images = await image.find();
    res.status(200);
    res.send(images);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.postImage = async (req, res) => {
  try {
    // const createdImage = await image.create(req.body);
    res.send(JSON.stringify('Image Uploaded'));
  } catch (e) {
    res.sendStatus(500);
  }
};
