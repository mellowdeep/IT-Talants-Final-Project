const express = require('express');

const playlistService = require('../services/playlist-service');
const playlistVideosService = require('../services/playlist-videos-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.get('/playlists', (req, res) => {
  const userId = req.user ? req.user.id : 0;
  playlistService.getOwnPlaylists(userId)
    .then(playlists => res.json(playlists))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.get('/playlist/:playlistId', (req, res) => {
  playlistService.getPlaylist(req.params.playlistId)
    .then(playlists => res.json(playlists))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.post('/create/playlist', (req, res) => {
  const playlist = {};
  playlist.name = req.body.name;
  playlist.userId = req.user ? req.user.id : 0;
  playlist.visibility = req.body.visibility || 'public';

  playlistService
    .createPlaylist(playlist)
    .then(id => res.json(id))
    .catch(err => res.status(status.BAD_REQUEST).send(err.message));
});

controller.put('/playlist/:playlistId/:uuid', (req, res) => {
  const {playlistId} = req.params;
  const videoUUID = req.params.uuid;
  const userId = req.user ? req.user.id : 0;

  playlistVideosService
    .addVideo(playlistId, videoUUID, userId)
    .then(id => res.json(id))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
});

controller.delete('/delete/playlist/:playlistId/:uuid', (req, res) => {
  playlistVideosService
    .deleteVideoFromPlaylist(req.params.playlistId, req.params.uuid)
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.send(err.message));
});

controller.delete('/delete/playlist/:playlistId', (req, res) => {
  const userId = req.user ? req.user.id : 0;
  playlistService
    .deletePlaylist(req.params.playlistId, userId)
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.status(status.UNAUTHORIZED).send(err.message));
});

controller.get('/playlist/:playlistId/videos', (req, res) => {
  playlistVideosService.getVideosByPlaylist(req.params.playlistId)
    .then(videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message))
});

module.exports = controller;
