const S3FS = require('s3fs');

const s3fsImpl = new S3FS('low-quality-videos-for-final-project', {
  accessKeyId : 'AKIAIQWV7DPQTSF3EQ2Q',
  secretAccessKey : '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',
  region:'ap-south-1'
});

module.exports = s3fsImpl;
