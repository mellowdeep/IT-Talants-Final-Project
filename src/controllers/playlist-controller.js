const express = require('express');

const playlistService = require('../services/playlist-service');
const playlistVideosService = require('../services/playlist-videos-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.get('/playlists', (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  playlistService.getOwnPlaylists(userId)
    .then(playlists => res.json(playlists))
    .catch(err => res.send(err));
});

controller.get('/:id/playlists', (req, res) => {
  playlistService.getPlaylist(req.params.id)
    .then(playlists => res.json(playlists))
    .catch(err => res.send(err));
});

controller.post('/create/playlist', (req, res) => {
  const playlist = {};
  playlist.name = req.body.name;
  playlist.userId = req.session.user ? req.session.user.id : 0;
  playlist.visibility = req.body.visibility || 'public';

  playlistService
    .createPlaylist(playlist)
    .then(id => res.json(id))
    .catch(err => res.send(err));
});

controller.put('/playlist/:id/:uuid', (req, res) => {
  const playlistId = req.params.id;
  const videoUUID = req.params.uuid;
  const userId = req.session.user ? req.session.user.id : 0;

  playlistVideosService
    .addVideo(playlistId, videoUUID, userId)
    .then(id => res.json(id))
    .catch(err => res.send(err));
});

controller.delete('/delete/playlist/:id/:uuid', (req, res) => {
  playlistVideosService
    .deleteVideoFromPlaylist(req.params.id, req.params.uuid)
    .then(res.sendStatus(status.OK))
    .catch(err => res.send(err));
});

controller.delete('/delete/playlist/:id', (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  playlistService
    .deletePlaylist(req.params.id, userId)
    .then(res.sendStatus(status.OK))
    .catch(err => res.send(err));
});

module.exports = controller;
