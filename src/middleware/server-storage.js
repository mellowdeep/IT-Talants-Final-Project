const fs = require('fs');
const path = require('path');
const s3fs = require('../middleware/amazon-cloud-service');

const getMetaData = require('./fileOperations/get-metadata');
const saveLowFormatFile = require('./fileOperations/convert-low-format');
const saveHighFormatFile = require('./fileOperations/conver-high-format');
const saveThumbnail = require('./fileOperations/take-screenshtot');
const uploadToAmazon = require('./amazonBucket/upload-Low-format');
const ffmpeg = require('../middleware/ffmpeg');

const lowQualityShowPath = '/upload/low/';
const highQualityShowPath = '/upload/high/';
const imageShowPath = '/upload/thumbnails/';

const removeFile = filePath => {
  fs.unlink(filePath, err => {
    if (err) console.log(err.message);
  });
};


const usePromise = (callback, params) =>
  new Promise((resolve, reject) =>
  callback(...params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  );


const saveFiles = (videoObj, file, uuid, form) => {
  const video = videoObj;
  const takeScreenshotTime = videoObj.durationScreenShot || 0;
  const type = file.type.split('/')
    .pop();
  const newName = `${uuid}`;
  const nameAndType = `${newName}.${type}`;
  const lowQualitySavePath = path.join(form.uploadDir, 'low/', nameAndType);
  const highQualitySavePath = path.join(form.uploadDir, 'high/', nameAndType);
  const imageSavePath = path.join(form.uploadDir, 'thumbnails/');
  const amazonPath = `https://s3.eu-west-2.amazonaws.com/${s3fs.bucket}/${nameAndType}`;

  const command = ffmpeg(path.join(file.path))
    .audioCodec('aac')
    .videoCodec('libx264')
    .format('mp4');


  video.image = `${imageShowPath}${uuid}.png`;
  return usePromise(getMetaData,[ffmpeg, path, file, video])
    .then(() => usePromise(saveThumbnail, [ffmpeg, file, path, takeScreenshotTime, uuid, imageSavePath, video]))
    .then(() => usePromise(saveLowFormatFile,[command, lowQualitySavePath, removeFile, lowQualityShowPath, video, uuid]))
    .then(() => usePromise(saveHighFormatFile,[command, highQualitySavePath, removeFile, highQualityShowPath, video, uuid]))
    .then(() => uploadToAmazon(s3fs, path, fs, removeFile, lowQualitySavePath, video, nameAndType, amazonPath))
    .catch((err) =>  console.error(err))
    .then(() => video);

};

module.exports = saveFiles;
