const express = require("express");
const passport = require("passport");

const userService = require('../services/user-service');
const status = require("../config/status-code");

const controller = express.Router();


controller.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['user_friends','email', 'manage_pages'] })
);


controller.get('/auth/facebook/callback',
  passport.authenticate('facebook'), (req, res) => {
    if (req.user) {
      res.redirect('back');
    } else {
      res.sendStatus(status.UNAUTHORIZED);
    }
  },
);

controller.post('/login/facebook',
  passport.authenticate('custom-facebook'), (req, res) => {
    if (req.user) {
      res.status(status.OK).send(req.user);
    } else {
      res.sendStatus(status.UNAUTHORIZED);
    }
  },
);



module.exports = controller;
