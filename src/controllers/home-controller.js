const express = require('express');
const videoService = require('../services/video-service');
const recentlySeen = require('../services/recently-seen-service');

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
controller.get('/home', (req, res) => {
  const videoObj = {};
  let index = 0;
  const user = req.session.user;
  if(user){
    recentlySeen.getRecentlyVideos(user.id)
      .then(videos => {
        videoObj.recently = videos;
      })
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
      .catch(err => res.send(err));
  };

  const sendData = () => {
    res.json(videoObj);
  };

  getVideos(sendData);
});

module.exports = controller;
