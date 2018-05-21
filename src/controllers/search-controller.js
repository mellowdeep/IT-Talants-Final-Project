const express = require('express');

const videoService = require('../services/video-service');
const playlistService = require('../services/playlist-service');

const status = require('../config/status-code');

const controller = express.Router();

controller.get('/search/:keyword', (req, res) => {
  videoService
    .getAllByMatchName(req.params.keyword)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.get('/search/tag/:keyword', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  videoService
    .getAllByTagAndSeen(req.params.keyword, loggedUser.id)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

module.exports = controller;
