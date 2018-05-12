const express = require('express');
const passport = require('passport');

const userService = require('../services/user-service');
const status = require("../config/status-code");

const controller = express.Router();

controller.post(
  '/login',
  passport.authenticate('local', (req, res) => {
    if (req.session.user) {
      res.sendStatus(status.OK);
    } else {
      res.sendStatus(status.BAD_REQUEST);
    }
  }),
);

controller.post('/register', (req, res) => {
  req.check('username', ' Invalid email address').isEmail();
  req.check('username', ' Username cannot be empty').notEmpty();
  req.check('password1', ' Password is too short').isLength({ min: 4 });
  req.check('password1', ' Passwords missmatch').equals(req.body.password2);

  userService.getUserByUserName(req.body.username, null).then(user => {
    if (user) {
      req
        .check('username', 'There is already registration with this email')
        .equals(user.username);
    }

    const errors = req.validationErrors();
    if (!errors) {
      const role = "user";
      userService
        .saveUser(
          req.body.username,
          req.body.password1,
          req.body.name || 'anonymous',
          role
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
