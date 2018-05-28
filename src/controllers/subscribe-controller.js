const express = require('express');

const subscribeService = require('../services/subscribe-service');
const status = require('../config/status-code');

const controller = express.Router();

controller.put('/subscribe/add/:userId', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  subscribeService.addSubscription(loggedUser.id, req.params.userId)
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.sent(status.INTERNAL_SERVER_ERROR).send(err.message))
});

controller.put('/subscribe/remove/:userId', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  subscribeService.removeSubscribe(loggedUser.id, req.params.userId)
    .then(() => res.sendStatus(status.OK))
    .catch(err => res.sent(status.INTERNAL_SERVER_ERROR).send(err.message))
});

controller.get('/subscribe/all', (req, res) => {
  const loggedUser = req.user;
  if (!loggedUser) {
    res.status(status.UNAUTHORIZED).send('User not found');
    return;
  }

  subscribeService.getAllSubscriptions(loggedUser.id)
    .then(users => res.status(status.OK).send(users))
    .catch(err => res.status(status.INTERNAL_SERVER_ERROR).send(err.message))
});



module.exports = controller;
