const express = require('express');

const videoService = require('../services/video-service');
const status = require("../config/status-code");

const PENDING = 'pending';
const APPROVED = 'approved';
const BLOCKED = 'blocked';

const controller = express.Router();

controller.get('/admin/approve', (req, res) => {
    videoService.getVideosByStatus(PENDING)
      .then(videos => res.send(videos))
      .catch(err => res.status(status.BAD_REQUEST).send(err.message));
});

controller.put('/admin/approve/:id', (req, res) =>
    videoService.updateVideo({}, req.params.id, APPROVED)
      .then(() => res.sendStatus(status.OK))
      .catch(err => res.status(status.NOT_FOUND).send(err.message))
);

controller.put('/admin/block/:id', (req, res) =>
  videoService.updateVideo({}, req.params.id, BLOCKED)
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
);

module.exports = controller;
