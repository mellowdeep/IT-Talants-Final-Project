const express = require('express');

const userService = require('../services/user-service');
const videoService = require('../services/video-service');
const subscribeService = require('../services/subscribe-service');
const status = require('../config/status-code');

const controller = express.Router();


controller.get('/user/:userId', (req, res) => {
  const loggedUser = req.user;
  const viewedUserId = Number(req.params.userId) || 0;

  let userWithInfo;
  userService.getUserInfo(viewedUserId)
    .then(userInfo => {
      userWithInfo = userInfo;
      if(loggedUser) {
        return subscribeService.getSingleSubscription(loggedUser.id, viewedUserId);
      }

      return null;
    })
    .then(subscribe => {
      userWithInfo.subscribesCount = subscribe.subscribesCount || 0;
      userWithInfo.subscribe = subscribe ? 1 : 0;
      return res.status(status.OK).send(userWithInfo);
    })
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

controller.get('/user/:userId/videos', (req,res) => {
  videoService.getVideosByUserId(req.params.userId, "private")
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

module.exports = controller;
