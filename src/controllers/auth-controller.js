const express = require('express');
const passport = require('passport');

const userService = require('../services/user-service');
const status = require("../config/status-code");

const controller = express.Router();

controller.get('/login', (req, res) => {
  if(req.user){
    res.send(req.user);
  }else{
    res.send(false)
  }
});

controller.get('/register', (req, res) => {
  if(req.user){
    res.send(req.user);
  }else{
    res.send(false)
  }
});

controller.get('/logout', (req, res) => {
  req.session.destroy();
  res.send(status.OK)
});

controller.post(
  '/login',
  passport.authenticate('local'), (req, res) => {
    console.log();
    if (req.user) {
      res.send(req.user);
    } else {
      res.send(status.BAD_REQUEST);
    }
  },
);

controller.post('/register', (req, res) => {
  req.check('username', ' Invalid email address').isEmail();
  req.check('username', ' Username cannot be empty').notEmpty();
  req.check('password1', ' Password is too short').isLength({ min: 3 });
  req.check('password1', ' Passwords missmatch').equals(req.body.password2);

  userService.getUserByUserName(req.body.username, null).then(user => {
    if (user) {
      req
        .check('username', 'There is already registration with this email')
        .equals(user.username);
    }

    const errors = req.validationErrors();
    if (!errors) {
      userService
        .saveUser(
          null,
          req.body.username,
          req.body.password1,
          req.body.name || 'anonymous',
          "user",
          "active",
          null
        )
        .then(currentUser => {
          req.session.user = currentUser;
          res.send(currentUser);
        });
    } else {
      res.status(status.UNAUTHORIZED).send(errors);
    }
  });
});

module.exports = controller;
