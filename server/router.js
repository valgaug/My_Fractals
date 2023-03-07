'use strict';

const router = require('express').Router();
const image = require('./Controllers/controller');
const multerjs = require('./multer');

router.get('/image', image.getImages);
router.post('/image', multerjs.upload.single('image'), image.postImage);
module.exports = router;
