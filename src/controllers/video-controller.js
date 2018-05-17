const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const ffmpeg = require('../middleware/ffmpeg');
const uuid = require('../middleware/uuid');
const videoService = require('../services/video-service');
const recently = require('../services/recently-seen-service');
const status = require('../config/status-code');

const PENDING = 'pending';
const NO_USER = 0;
const LIKE = 1;
const DISLIKE = 0;
const VIDEO = 'video';

const controller = express.Router();


controller.get('/videos', (req,res) => {
  const userId = req.user ? req.user.id : 0;
  videoService.getVideosByUserId(userId, null)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

controller.get('/video/:uuid', (req, res) => {
  /* user_id
    name:
    play_count
    about
    id
    video
    image
    status
    likes_count
    post_date
    low_quality
    high_quality
    tag
    uuid
    visibility - public/private */

  videoService
    .getOneByUUID(req.params.uuid)
    .then(video => {
      if (req.user) {
        const userId = req.user.id;
        const seenDate = new Date().toLocaleDateString();
        recently.addVideo(video.id, userId, seenDate);
      }

      res.send(video);
      return video;
    })
    .then(video => videoService.increaseCounter(video))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.delete('/delete/:uuid', (req, res) => {
  const userId = req.user ? req.user.id : NO_USER;
  videoService
    .deleteVideo(req.params.uuid, userId)
    .then(video => res.json(video))
    .catch(err => res.status(status.UNAUTHORIZED).send(err));
});

controller.put('/:uuid/like/:isLike', (req, res) => {
  const isLike = req.params.isLike === 'true' ? LIKE : DISLIKE;
  const userId = req.user ? req.user.id : NO_USER;
  videoService
    .addRemoveLike(req.params.uuid, userId, isLike)
    .then(res.sendStatus(status.OK))
    .catch(err => res.status(status.BAD_REQUEST).send(err));
});

controller.post('/upload', (req, res) => {
  if(!req.user) {
    res.status(status.UNAUTHORIZED).send("User not found");
    return;
  }

  const videoObj = {};
  const fields = [];
  let file;
  let newName;
  let videoCounter = 0;
  const form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../../public/upload');

  form.on('file', (field, newFile) => {
    file = newFile;
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
    if(!file) {
      res.status(status.BAD_REQUEST).sendDate("File not found");
      return;
    }

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
      })
  };

  const removeFile = (filePath) => {
    fs.unlink(filePath, err => {
      if (err) console.log(err.message)
    });
  };


  const checkVideos = () => {
    videoCounter++;
    if (videoCounter >= 2) {
       removeFile(file.path);
       sendVideoToDB();
    }
  };

  // rename uploaded file with new name
  const converFile = (uuid, file) => {
    const ref = file.type.split('/').shift();
    const type = file.type.split('/').pop();
          newName = `${uuid}`;
    const nameAndType = `${newName}.${type}`;
    const lowQualitySavePath = path.join(form.uploadDir, 'low/', nameAndType);
    const lowQualityShowPath = `/upload/low/${nameAndType}`;
    const highQualitySavePath = path.join(form.uploadDir, 'high/', nameAndType);
    const highQualityShowPath = `/upload/high/${nameAndType}`;
    const imagePath = path.join(form.uploadDir, 'thumbnails/');
    const imageShowPath =  `/upload/thumbnails/${newName}.png`;

    if (ref.toLowerCase() !== VIDEO) {
      res.status(status.BAD_REQUEST).send('Unsupported video format');
      return;
    }

    ffmpeg.ffprobe(path.join(file.path), (err, metadata) => {
      const duration = metadata.streams[0].duration.toString().split('.');
      const min = (Number(duration.shift()) || 0) / 60;
      const sec = (Number(duration.pop()) || 0) / 60;
      videoObj.duration = `${min.toFixed().slice(0,2)}:${sec.toFixed().slice(0,2)}`;
    });

    ffmpeg(path.join(file.path)).takeScreenshots(
      {
        count: 1,
        size: '200x200',
        timemarks: ['5'],
        filename: `${uuid}.png`,
      },
      imagePath,
      (err) => {
        if (err) console.log(err.message);
      },
    );

    const command = ffmpeg(path.join(file.path))
      .audioCodec('ac3')
      .videoCodec('libx264')
      .format('mp4');

    command
      .clone()
      .size('512x288')
      .save(lowQualitySavePath)
      .on('error', (err) => {
        removeFile(lowQualitySavePath);
        checkVideos();
        console.log(`An error occurred: ${  err.message}`);
      })
      .on('end', () => {
        videoObj.low = lowQualityShowPath;
        checkVideos();
      });

    command
      .clone()
      .size('896x504')
      .save(highQualitySavePath)
      .on('error', (err) => {
        removeFile(highQualitySavePath);
        checkVideos();
        console.log(`An error occurred: ${  err.message}`);
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
      .then(id => res.status(status.OK).send({'id': id, 'uuid': newName}))
      .catch(err => res.status(status.NOT_FOUND).send(err.message));
  };
});

module.exports = controller;
