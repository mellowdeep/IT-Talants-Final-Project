const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uuid = require('../middleware/uuid');
const videoService = require('../services/video-service');
const recently = require('../services/recently-seen-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.get('/:uuid', (req, res) => {
  /* user_id
    name:
    play_count
    about
    id
    video
    image
    status
    likes_count
    dislikes_count
    post_date
    tag
    uuid
    visibility - public/private */

  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      if(req.session.user){
        const userId = req.sesssion.id;
        const seenDate = new Date().toLocaleDateString();
        recently.addVideo(video.id, userId, seenDate)
      }

      res.json(video);
      return video;
    })
    .then(video => videoService.increaseCounter(video))
    .catch(err => res.status(status.NOT_FOUND).send(err));
});

controller.delete('/delete/:uuid', (req, res) => {
  videoService
    .deleteVideo(req.params.uuid, req.session.user.id)
    .then(video => res.json(video))
    .catch(err => res.status(status.UNAUTHORIZED).send(err));
});

controller.put("/:uuid/like/:isLike", (req, res) => {
  const isLike = req.params.isLike === 'true' ? 1 : 0;
  const userId = req.session.user ? req.session.user.id : 1;
  videoService.addRemoveLike(req.params.uuid, userId , isLike)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});


controller.post('/upload', (req, res) => {
  let newName;
  const videoObj = {};
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

  // name - requeired; about - required ; visibility [public, private] required, tag - required
  form.on('field', (name, value) => {
    fields.push({ name, value });
  });

  // log any errors that occur
  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', () => {
    getUniqueUUID(renameFile);
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

  const getUniqueUUID = callback => {
    const uniqueId = uuid();
    videoService
      .getOneByUUID(uniqueId)
      .then(video => {
        if (video) {
          getUniqueUUID(callback);
        } else {
          files.forEach(file => callback(uniqueId, file));
          videoObj.uuid = uniqueId;
          sendVideoToDB();
        }
      })
      .catch((err) => res.sendStatus(err.statusCode).json(err.message));
  };

  // rename uploaded file with new name
  const renameFile = (uuid, file) => {
    const type = file.type.split('/').pop();
    const ref = file.type.split('/').shift();
         newName = `${uuid}.${type}`;
    fs.rename(file.path, path.join(form.uploadDir, newName), err => {
        if (err) {
          removeFile(newName);
        }
      })
      .catch(err => res.send(err));

    videoObj[ref] = newName;
  };

  const removeFile = () => {
    fs.unlink(path.join(form.uploadDir, newName), err => {
      if (err)
        throw err;
    });
  };

  const sendVideoToDB = () => {
    videoObj.userId = req.session.user.id;
    videoObj.postDate = new Date().toLocaleDateString();

    for (const field of fields) {
      videoObj[field.name] = field.value;
    }

    videoService
      .addVideo(videoObj)
      .then(res.sendStatus(status.OK))
      .catch(err => {
        removeFile(newName);
        res.status(status.NOT_FOUND).send(err);
      })
  };
});

module.exports = controller;
