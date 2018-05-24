const express = require('express');
const passport = require('passport');

const status = require('../config/status-code');

const controller = express.Router();

// google login

controller.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
);

controller.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    if (req.user) {
      return res.redirect('https://127.0.0.1:443/main');
    }
    return res.sendStatus(status.UNAUTHORIZED);
  },
);

module.exports = controller;
