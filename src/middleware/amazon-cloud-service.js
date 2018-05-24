const S3FS = require('s3fs');

const keys = require('../../keys');

const s3fsImpl = new S3FS('low-quality-videos-for-final-project', {
  accessKeyId : keys.amazonKey,
  secretAccessKey : keys.amazonSecret,
  region:'ap-south-1'
});

module.exports = s3fsImpl;
