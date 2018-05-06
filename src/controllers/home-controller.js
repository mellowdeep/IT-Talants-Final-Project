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
  // userService.getAllUsers()
  //   .then(data => {
  //     res.send(data);
  //   });

  res.send("Works");

  // res.render('index', {
  //   user: {
  //     name: req.user.name,
  //     image: req.user.image,
  //     email: req.user.email,
  //   },
  // });
});

/* GET user by name page. */
controller.get('/user/:username', (req, res) => {
  userService.getUserByUserName(req.params.username).then(data => {
    res.send(data);
  });
});

/* GET user by id page. */
controller.get('/user/id/:id', (req, res) => {
  userService.getUserById(req.params.id).then(data => {
    res.send(data);
  });
});

module.exports = controller;
