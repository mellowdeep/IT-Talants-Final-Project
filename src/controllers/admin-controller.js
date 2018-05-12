const express = require('express');

const videoService = require('../services/video-service');
const status = require("../config/status-code");

const PENDING = 'pending';
const APPROVED = 'approved';

const controller = express.Router();

controller.get('/admin/approve', (req, res) => {
    videoService.getVideosByStatus(PENDING)
      .then(videos => res.send(videos))
      .catch(err => res.status(status.BAD_REQUEST).send(err))
});

controller.put('/admin/approve/:id', (req, res) => {
    videoService.getVideoById(req.params.id)
      .then(video => {
        video.status = APPROVED;
       return videoService.updateVideo(video, video.id)
      })
      .then(res.sendStatus(status.OK))
      .catch(err => res.status(status.NOT_FOUND).send(err));
});

module.exports = controller;
