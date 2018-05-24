const express = require("express");
const passport = require("passport");

const status = require("../config/status-code");

const controller = express.Router();


controller.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends','email', 'manage_pages'] })
);


controller.get('/auth/facebook/callback',
  passport.authenticate('facebook'), (req, res) => {
    if (req.user) {
      return res.redirect('/login');
    }
      res.sendStatus(status.UNAUTHORIZED);
  },
);


module.exports = controller;
