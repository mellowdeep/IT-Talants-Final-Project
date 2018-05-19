const express = require('express');

const subbscribeService = require('../services/subscribe-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.put('/subscribe/add/:userId', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  subbscribeService.addSubscribtion(loggedUser.id, req.params.userId)
    .then(res.sendStatus(status.OK))
    .catch(err => res.sent(status.INTERNAL_SERVER_ERROR).send(err.message))
});

controller.put('/subscribe/remove/:userId', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  subbscribeService.removeSubscribe(loggedUser.id, req.params.userId)
    .then(res.sendStatus(status.OK))
    .catch(err => res.sent(status.INTERNAL_SERVER_ERROR).send(err.message))
});

module.exports = controller;
