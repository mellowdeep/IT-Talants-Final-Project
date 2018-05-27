const express = require('express');
const db = require('../config/db');

const videoService = require('../services/video-service');
// const playlistService = require('../services/playlist-service');

const status = require('../config/status-code');

const controller = express.Router();

controller.post('/api/search', (req, res) => {

  const { query, type } = req.body;
  if(!query || !type) return res.status(status.NOT_FOUND).send('Type or query is null');
  // res.status(status.OK).send({msg:'test'})

  if(type==='tag'){
    db.getMultipleResult(
      `SELECT
        videos.uuid
      FROM
        videos
      WHERE videos.visibility = 'public'
        and videos.status IS NOT 'blocked'
        and tag = ?`, query)
    .then( uuids => Promise.all(uuids.map(({ uuid }) => videoService.getOneByUUID(uuid))))
    .then( videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
  }

  if(type==='query'){
    db.getMultipleResult(
      `SELECT
        videos.uuid
      FROM
        videos
      WHERE videos.visibility = 'public'
        and videos.status IS NOT 'blocked'
        and upper(videos.name) like upper(?)`, `%${query}%`)
    .then( uuids => Promise.all(uuids.map(({ uuid }) => videoService.getOneByUUID(uuid))))
    .then( videos => res.status(status.OK).send(videos))
    .catch(err => res.status(status.NOT_FOUND).send(err.message));
  }



});

// controller.get('/search/tag/:keyword', (req, res) => {
//   const loggedUser = req.user;
//   if (!loggedUser) {
//     res.status(status.UNAUTHORIZED).send('User not found');
//     return;
//   }

//   videoService
//     .getAllByTagAndSeen(req.params.keyword, loggedUser.id)
//     .then(videos => res.status(status.OK).send(videos))
//     .catch(err => res.status(status.NOT_FOUND).send(err.message));
// });

module.exports = controller;
