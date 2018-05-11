const express = require('express');

const playlistService = require('../services/playlist-service');
const playlistVideosService = require('../services/playlist-videos-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.post('/playlist/create', (req, res) => {
  const playlist = {};
  playlist.name = req.body.name;
  playlist.userId = req.session.user.id;
  playlist.visibility = req.body.visibility || 'public';

  playlistService
    .createPlaylist(playlist)
    .then(id => res.status(status.OK).json(id))
    .catch((err) =>
      res
        .status(status.INTERNAL_SERVER_ERROR)
        .json({ error: err }));
});

controller.put('/playlist/:id/:uuid', (req, res) => {
  const playlistId = req.params.id;
  const videoUUID = req.params.uuid;
  const userId = req.session.user.id;

  playlistVideosService
    .addVideo(playlistId, videoUUID, userId)
    .then(id =>  res.json(id))
    .catch((err) => res.sendStatus(err.statusCode).json(err.message));
});

controller.delete('/playlist/delete/:id/:uuid', (req, res) => {
  playlistVideosService.deleteVideoFromPlaylist(req.params.id, req.params.uuid)
    .then(res.status(status.OK))
    .catch((err) => res.sendStatus(err.statusCode).json(err.message));
});

controller.delete('/playlist/delete/:id', (req, res) => {
  playlistService.deletePlaylist(req.params.id, req.params.session.id)
    .then(res.status(status.OK))
    .catch((err) => res.sendStatus(err.statusCode).json(err.message));
});

module.exports = controller;
