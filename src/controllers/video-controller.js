const express = require('express');
const formidable = require('formidable');
const videoService = require('../services/video-service');
const fs = require('fs');
const path = require('path');
const uuid = require('../middleware/uuid');

const controller = express.Router();

controller.post('/upload', (req, res) => {
  const video = {};
  const files = [];
  const fields = [];
  const form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public/upload');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', (field, file) => {
    files.push(file);
  });

  form.on("field", (name, value) => {
    fields.push({ name, value });
  });

  // log any errors that occur
  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on("end", () => {
    getUniqueUUID(renameFile);
    res.end("success");
  });

  // parse the incoming request containing the form data
  form.parse(req);

  const getUniqueUUID = callback => {
    const uniqueId = uuid();
    videoService.getOneByUUID(uniqueId).then(video => {
      if (video) {
        getUniqueUUID(callback);
      } else {
        files.forEach(file => callback(uniqueId, file));
        sendVideoToDB();
      }
    });
  };

  // rename uploaded file with new name
  const renameFile = (uuid, file) => {
    const type = file.type.split("/").pop();
    const ref = file.type.split("/").shift();
    const newName = `${uuid  }.${  type}`;
    fs.rename(file.path, path.join(form.uploadDir, newName), err => {
      if (err) {
        fs.unlink(path.join(form.uploadDir, newName), err => {
          if (err) throw err;
        });
      }
    });

    video[ref] = newName;
  };

  const sendVideoToDB = () => {
    video.userId = req.session.user.id;
    for (const field of fields) {
      video[field.name] = field.value;
    }
  };
});

module.exports = controller;
