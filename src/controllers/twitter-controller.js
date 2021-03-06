const express = require('express');
const passport = require('passport');

const status = require("../config/status-code");

const controller = express.Router();


// twitter login

controller.get('/auth/twitter', passport.authenticate('twitter'));

controller.get(
  '/twitter/callback',
  passport.authenticate('twitter'), (req, res) => {
    if (req.user) {
      return res.redirect('https://127.0.0.1:443/main');
    }
    return res.sendStatus(status.UNAUTHORIZED);
  },
);

module.exports = controller;
