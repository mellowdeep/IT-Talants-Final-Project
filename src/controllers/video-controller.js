const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const uuid = require('../middleware/uuid');
const videoService = require('../services/video-service');
const addFilesToStorage = require('../middleware/server-storage');
const userVideoLikeService = require('../services/user-video-likes-service');
const recently = require('../services/recently-seen-service');
const status = require('../config/status-code');

const tempShowPath = '/upload/';
const PENDING = 'pending';
const ADD = 1;
const REMOVE = 0;
const VIDEO = 'video';
const INIT_VALUE = 1;

const controller = express.Router();

controller.get('/videos', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  videoService
    .getVideosByUserId(loggedUser.id, null)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.get('/videos/recentlyseen', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  videoService
    .getRecentlyVideos(loggedUser.id)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.BAD_REQUEST).send(err.message));
});

controller.get('/video/:uuid', (req, res) => {
  let currVideo;
  const seenDate = new Date().toLocaleDateString();
  const loggedUser = req.user;
  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      currVideo = video;
      if (loggedUser) {
        return videoService.getVideoAndUserRate(video, loggedUser.id);
      }

      return video;
    })
    .then(video  => video ?
      res.status(status.OK).send(video):
      res.status(status.OK).send(currVideo))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
    .then(() => videoService.increaseCounter(currVideo))
    .then(() => {
      if(loggedUser){
        return recently.addVideo(currVideo.id, loggedUser.id, seenDate);
      }
    })
    .catch(err => console.log(err.message));

});


controller.delete('/delete/:uuid', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  videoService
    .deleteVideo(req.params.uuid, loggedUser.id)
    .then(video => res.json(video))
    .catch(err => res.status(status.BAD_REQUEST).send(err.message));
});

controller.put('/:uuid/like/:isLike', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  let {isLike} = req.params;
  if(isLike.toLowerCase() !== true.toString() && isLike.toLowerCase() !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isLike = isLike.toLowerCase() === true.toString() ? ADD : REMOVE;
  let videoId;
  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      if (!video) {
        throw new Error("Video not found");
      }

      videoId = video.id;
      return videoService.addRemoveLike(video, loggedUser.id, isLike);
    })
    .then(() => userVideoLikeService.getLikeByVideoAndUser(loggedUser.id, videoId))
    .then(like => {
      if (like) {
        isLike = isLike ? ADD : REMOVE;
        return userVideoLikeService.updateRate(loggedUser.id, videoId, isLike, like.dislike_sign);
      }
      return userVideoLikeService.addRate(loggedUser.id, videoId, INIT_VALUE, 0);
    })
    .then(() => res.sendStatus(status.OK))
    .catch(err => {
      console.log(err.message);
      res.sendStatus(status.NOT_FOUND)
    });
});

controller.put('/:uuid/dislike/:isDislike', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  let {isDislike} = req.params;
  if(isDislike.toLowerCase() !== true.toString() && isDislike.toLowerCase() !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isDislike = isDislike.toLowerCase() === true.toString() ? ADD : REMOVE;
  let videoId;
  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      if (!video) {
        throw new Error("Video not found");
      }

      videoId = video.id;
      return videoService.addRemoveDislike(video, loggedUser.id, isDislike);
    })
    .then(() => userVideoLikeService.getLikeByVideoAndUser(loggedUser.id, videoId))
    .then(
      like => {
        if (like) {
          isDislike = isDislike ? ADD : REMOVE;
          return userVideoLikeService.updateRate(loggedUser.id, videoId, like.like_sign, isDislike);
        }

        return userVideoLikeService.addRate(loggedUser.id, videoId, 0, INIT_VALUE);
      })
    .then(() => res.sendStatus(status.OK))
    .catch(err => {
      console.log(err.message);
      res.sendStatus(status.NOT_FOUND)
    });
});

controller.post('/upload', (req, res) => {
  if (!req.user) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  let file;
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '../../public/upload');
  form.on('file', (field, newFile) => {
    file = newFile;
  });

  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  form.on('end', () => {
    if (!file) {
      res.status(status.BAD_REQUEST)
        .sendDate('File not found');
      return;
    }

    if (file.type.split('/')
        .shift()
        .toLowerCase() !== VIDEO) {
      res.status(status.BAD_REQUEST)
        .send('Unsupported video format');
      return;
    }

    const fileName = file.path.split('\\').pop();
    req.session.videoFile = file;
    res.status(status.OK).send(tempShowPath + fileName);
  });

  form.parse(req);

});

controller.post('/upload/continue', (req, res) => {
  if (!req.user) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  const videoObj = {};
  const fields = [];
  let file;
  const form = new formidable.IncomingForm();
  form.multiples = true;
  form.uploadDir = path.join(__dirname, '../../public/upload');

  form.on('field', (name, value) => {
    fields.push({ name, value });
  });

  form.on('error', err => {
    console.log(`An error has occured: \n${err}`);
  });

  form.on('end', () => {
    if (!req.session.videoFile) {
      res.status(status.BAD_REQUEST).send('File not found');
      return;
    }

    res.sendStatus(status.OK);
    for (const field of fields) {
      videoObj[field.name] = field.value;
    }

    file = req.session.videoFile;
    getUniqueUUID(convertFile);
  });

  form.parse(req);

  const getUniqueUUID = callback => {
    const uniqueId = uuid();
    videoService
      .getOneByUUID(uniqueId)
      .catch(err => console.log(err.message))
      .then(video => {
        if (video) {
          getUniqueUUID(callback);
        } else {
          videoObj.uuid = uniqueId;
          callback(uniqueId, file)
        }
      });
  };

  const removeFile = filePath => {
    fs.unlink(filePath, err => {
      if (err) console.log(err.message);
    });
  };

  const convertFile = (uuid, file) =>
    addFilesToStorage(videoObj, file, uuid, form)
      .then(currVideoObj => sendVideoToDB(currVideoObj))
      .catch(err => console.log(err.message));


  const sendVideoToDB = (currVideoObj) => {
    currVideoObj.userId = req.user.id;
    currVideoObj.postDate = new Date().toLocaleDateString();
    currVideoObj.status = PENDING;

    videoService
      .addVideo(currVideoObj)
      .then(removeFile(file.path))
      .catch(err => console.log(err));
  };

});

module.exports = controller;
