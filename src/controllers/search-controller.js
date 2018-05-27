const express = require('express');

const videoService = require('../services/video-service');

const status = require('../config/status-code');

const controller = express.Router();

controller.post('/api/search', (req, res) => {
  const { query, type } = req.body;
  if(!query || !type) {
    res.status(status.BAD_REQUEST).send('Type or query is null');
    return;
  }

  if(type !== 'tag' || type !== 'query') {
    res.status(status.BAD_REQUEST).send('Invalid search request');
    return;
  }

  videoService
    .getAllByTypeAndMatchName(type , query)
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
