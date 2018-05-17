const express = require('express');

const userService = require('../services/user-service');
const videoService = require('../services/video-service');
const status = require('../config/status-code');

const controller = express.Router();


controller.get('/user/:userId', (req, res) => {
  userService.getUserInfo(req.params.userId)
    .then(userInfo => res.status(status.OK).send(userInfo))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

controller.get('/user/:userId/videos', (req,res) => {
  videoService.getVideosByUserId(req.params.userId, "private")
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

module.exports = controller;
