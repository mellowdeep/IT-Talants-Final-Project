const express = require('express');

const controller = express.Router();
const passport = require('passport');

// twitter login

controller.get('/auth/twitter', passport.authenticate('twitter'));

controller.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, check for user , if none add user to DB , redirect home.
    res.redirect('/');
  },
);

module.exports = controller;
