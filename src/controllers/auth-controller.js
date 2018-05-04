const express = require('express');

const controller = express.Router();

controller.get('/login', (req, res, next) => {
  // TBA return login page
  res.render('login');
});

controller.get('/register', (req, res, next) => {
  // TBA return register page
  res.render('register');
});

controller.post('/login', (req, res, next) => {
  // TBA checking for user credentials
  // res.send({});
  // req.redirect("/")
});

controller.post('/register', (req, res, next) => {
  // TBA check constraints and add data to db
  // req.redirect("/")
});

module.exports = controller;
