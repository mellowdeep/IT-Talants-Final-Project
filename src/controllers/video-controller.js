const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const ffmpeg = require('../middleware/ffmpeg');
const uuid = require('../middleware/uuid');
const videoService = require('../services/video-service');
const userVideoLikeService = require('../services/user-video-likes-service');
const recently = require('../services/recently-seen-service');
const status = require('../config/status-code');

const lowQualityShowPath = '/upload/low/';
const highQualityShowPath = '/upload/high/';
const imageShowPath = '/upload/thumbnails/';
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

  recently
    .getRecentlyVideos(loggedUser.id)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.BAD_REQUEST).send(err.message));
});

controller.get('/video/:uuid', (req, res) => {
  const loggedUser = req.user;
  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      if (loggedUser) {
        const seenDate = new Date().toLocaleDateString();
        videoService.getVideoByIdAndUserRate(video.id, loggedUser.id)
          .then(newVideoData => {
            if(newVideoData) {
              return newVideoData;
            }

            return video;
          });
        recently.addVideo(video.id, loggedUser.id, seenDate);
      }else {
        return video;
      }

      return video;
    })
    .then(video => res.status(status.OK).send(video))
    .then(video =>  videoService.increaseCounter(video))
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
  if(isLike !== true.toString() && isLike !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isLike = isLike === true.toString() ? ADD : REMOVE;
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
  if(isDislike !== true.toString() && isDislike !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isDislike = isDislike === true.toString() ? ADD : REMOVE;
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
      res.status(status.BAD_REQUEST).sendDate('File not found');
      return;
    }

    if (file.type.split('/').toLowerCase() !== VIDEO) {
      res.status(status.BAD_REQUEST).send('Unsupported video format');
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
  let newName;
  let videoCounter = 0;
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

    file = req.session.videoFile;
    getUniqueUUID(converFile);
  });

  // parse the incoming request containing the form data
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
          callback(uniqueId, file);
        }
      });
  };

  const removeFile = filePath => {
    fs.unlink(filePath, err => {
      if (err) console.log(err.message);
    });
  };

  const checkVideos = () => {
    videoCounter++;
    if (videoCounter >= 2) {
      removeFile(file.path);
      sendVideoToDB();
    }
  };

  const converFile = (uuid, file) => {
    const takeScreenshotTime = videoObj.durationScreenshot || 0;
    const type = file.type.split('/').pop();
    newName = `${uuid}`;
    const nameAndType = `${newName}.${type}`;
    const lowQualitySavePath = path.join(form.uploadDir, 'low/', nameAndType);
    const highQualitySavePath = path.join(form.uploadDir, 'high/', nameAndType);
    const imageSavePath = path.join(form.uploadDir, 'thumbnails/');


    ffmpeg.ffprobe(path.join(file.path), (err, metadata) => {
      const duration = metadata.streams[0].duration.toString().split('.');
      const min = (Number(duration.shift()) || 0) / 60;
      const sec = (Number(duration.pop()) || 0) / 60;
      videoObj.duration = `${min.toFixed().slice(0, 2)}:${sec
        .toFixed()
        .slice(0, 2)}`;
    });

    ffmpeg(path.join(file.path)).takeScreenshots({
        count: 1,
        size: '200x200',
        timemarks: [takeScreenshotTime],
        filename: `${uuid}.png`,
      },
      imageSavePath,
      err => {
        if (err) console.log(err.message);
      },
    );

    const command = ffmpeg(path.join(file.path))
      .audioCodec('aac')
      .videoCodec('libx264')
      .format('mp4');

    command
      .clone()
      .size('512x288')
      .save(lowQualitySavePath)
      .on('error', err => {
        removeFile(lowQualitySavePath);
        checkVideos();
        console.log(`An error occurred: ${err.message}`);
      })
      .on('end', () => {
        videoObj.low = lowQualityShowPath;
        checkVideos();
      });

    command
      .clone()
      .size('896x504')
      .save(highQualitySavePath)
      .on('error', err => {
        removeFile(highQualitySavePath);
        checkVideos();
        console.log(`An error occurred: ${err.message}`);
      })
      .on('end', () => {
        videoObj.high = highQualityShowPath;
        checkVideos();
      });

    videoObj.image = imageShowPath;
  };

  const sendVideoToDB = () => {
    videoObj.userId = req.user.id;
    videoObj.postDate = new Date().toLocaleDateString();
    videoObj.status = PENDING;

    for (const field of fields) {
      videoObj[field.name] = field.value;
    }

    videoService
      .addVideo(videoObj)
      .then(id => res.status(status.OK).send({ id: id, uuid: newName }))
      .catch(err => res.status(status.NOT_FOUND).send(err.message));
  };
});

module.exports = controller;
