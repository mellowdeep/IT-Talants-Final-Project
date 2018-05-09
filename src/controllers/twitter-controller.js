const express = require('express');

const controller = express.Router();
const passport = require('passport');

// twitter login

controller.get('/auth/twitter', passport.authenticate('twitter'));

controller.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => res.sendStatus(200)
);

module.exports = controller;
