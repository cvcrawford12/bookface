const fs = require('fs');
const aws = require('aws-sdk');
const config = require('../config/secret');
const crypto = require('crypto');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: process.env.BUCKET
});

const storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) cb(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        cb(null, filename);
      })
    }
  }),
  limits: { fileSize: '50mb'}
});

exports.upload = storage;
