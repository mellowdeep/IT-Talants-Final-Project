const express = require('express');
const userService = require('../services/user-service');

const controller = express.Router();
// Should be added to private views

// controller.use("/", (req, res, next) => {
//   if(!req.user) {
//     res.redirect("/login");
//   }
//
//   next();
// });

/* GET home page. Add session user to view */
controller.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

module.exports = controller;
