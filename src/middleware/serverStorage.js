const fs = require('fs');
const path = require('path');

const getMetaData = require('./fileOperations/getMetadata');
const saveLowFormatFile = require('./fileOperations/convertToLowFormat');
const saveHighFormatFile = require('./fileOperations/converToHighFormat');
const saveThumbnail = require('./fileOperations/takeScreenShtot');
const ffmpeg = require('../middleware/ffmpeg');
const util = require('util');

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
  const takeScreenshotTime = videoObj.durationScreenshot || 0;
  const type = file.type.split('/')
    .pop();
  const newName = `${uuid}`;
  const nameAndType = `${newName}.${type}`;
  const lowQualitySavePath = path.join(form.uploadDir, 'low/', nameAndType);
  const highQualitySavePath = path.join(form.uploadDir, 'high/', nameAndType);
  const imageSavePath = path.join(form.uploadDir, 'thumbnails/');

  const command = ffmpeg(path.join(file.path))
    .audioCodec('aac')
    .videoCodec('libx264')
    .format('mp4');


  // Remove temp file after 10 min.
  setTimeout((filePath, callback) => {
    callback(filePath)
  }, 600000)(file.path, removeFile);

  video.image = `${imageShowPath}${uuid}.png`;
   return usePromise(getMetaData,[ffmpeg, path, file, video])
       .then(() => usePromise(saveLowFormatFile,[command, lowQualitySavePath, removeFile, lowQualityShowPath, video, uuid]))
       .then(() => usePromise(saveHighFormatFile,[command, highQualitySavePath, removeFile, highQualityShowPath, video, uuid]))
       .then(() => usePromise(saveThumbnail, [ffmpeg, file, path, takeScreenshotTime, uuid, imageSavePath, video]))

};

module.exports = saveFiles;
