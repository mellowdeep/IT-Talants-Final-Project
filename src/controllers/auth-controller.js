const express = require('express');

const controller = express.Router();

controller.get('/login', (req, res) => {
  // TBA return login page
  res.render('login');
});

controller.get('/register', (req, res) => {
  // TBA return register page
  res.render('register');
});

controller.post('/login', (req, res) => {
  // TBA checking for user credentials
  // res.send({});
  // req.redirect("/")
});

controller.post('/register', (req, res) => {
  // TBA check constraints and add data to db
  // req.redirect("/")
});

module.exports = controller;
