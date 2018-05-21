const express = require('express');
const videoService = require('../services/video-service');

const controller = express.Router();

const tags = ['muisc', 'news', 'trailers', 'animation'];
// Should be added to private views

// controller.use("/", (req, res, next) => {
//   if(!req.user) {
//     res.redirect("/login");
//   }
//
//   next();
// });

 // return obj with tag : array of videos
controller.get('/main', (req, res) => {
  const videoObj = {};
  let index = 0;
  const user = req.user;
  if(user){
    videoService.getRecentlyVideos(user.id)
      .then(videos => {
        videoObj.recently = videos;
      })
      .catch(err => console.log(err.message));
  }

  const getVideos = (callback) => {
    videoService
      .getVideosByTag(tags[index])
      .then(videos => {
        videoObj[tags[index]] = videos
      })
      .then(() => {
        if (++index > tags.length - 1) {
          callback();
        } else {
          getVideos(callback);
        }
      })
      .catch(err => res.send(err.message));
  };

  const sendData = () => {
    res.send(videoObj);
  };

  getVideos(sendData);
});

module.exports = controller;
