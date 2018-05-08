const express = require('express');
const passport = require("passport");
const userService = require("../services/user-service");

const controller = express.Router();


controller.get("/login", (req, res) => {
  res.render("login");
});

controller.get("/register", (req, res) => {
  res.render("register");
});

controller.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
});

controller.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

controller.post("/register", (req, res) => {
  req.check("username", " Invalid email address").isEmail();
  req.check("username", " Username cannot be empty").isEmpty();
  req.check("password1", " Password is too short").isLength({ min: 4 });
  req.check("password1", " Passwords missmatch").equals(req.body.password2);

  userService.getUserByUserName(req.body.username, null).then(user => {
    if (user) {
      req
        .check("username", "There is already registration with this email")
        .equals(user.username);
    }

    const errors = req.validationErrors();
    if (!errors) {
      const newUser = {
        username: req.body.username,
        name: req.body.name,
        password: req.body.password1,
        status: "active"
      };

      userService.saveUser(newUser).then(() => {
        res.redirect("/");
      });
    } else {
      req.session.errors = errors;
      res.render("", { err: errors });
    }
  });
});

module.exports = controller;

