const express = require('express');

const controller = express.Router();
const passport = require('passport');

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
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, check for user , if none add user to DB , redirect home.
    res.redirect('/');
  },
);

module.exports = controller;
