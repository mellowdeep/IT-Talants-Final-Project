const express = require('express');
const formidable = require('formidable');
const videoService = require('../services/video-service');
const fs = require('fs');
const path = require('path');
const uuid = require('../config/uuid');

const controller = express.Router();

controller.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../upload');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    getUniqueUUID(renameFile, file);
  });

  // log any errors that occur
  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

  const getUniqueUUID = (callback, file) => {
    const uniqueId = uuid();
    videoService.getOneByUUID(uniqueId).then(video => {
      if (video) {
        getUniqueUUID(callback, file);
      } else {
        callback(uniqueId, file);
      }
    });
    callback(uniqueId, file);
  };

  const renameFile = (uniqueId, file) => {
    const mime = file.name.split('.').pop();
    const newName = `${uniqueId}.${mime}`;
    fs.rename(file.path, path.join(form.uploadDir, newName), err => {
      if (err) {
        fs.unlink(path.join(form.uploadDir, newName), err => {
          if (err) throw err;
        });
      }

      videoService.save(); // video
    });
  };
});

module.exports = controller;
