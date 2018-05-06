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
  const email = req.body.eqmail;
  const password = req.body.password;
  userService.getUser(email, password)
    .then(() => {
      // TBA checking for user credentials
      // res.send({});
      // req.redirect("/")
    });
}

  controller.post('/register', (req, res) => {
    req.check('email', ' Invalid email address')
      .isEmail();
    req.check('username', ' Username cannot be empty')
      .isEmpty();
    req.check('password1', ' Password is too short')
      .isLength({ min: 4 });
    req.check('password1', ' Passwords missmatch')
      .equals(req.body.password2);

    userService.findByEmail(req.body.email)
      .then(user => {
        req.check("email", "There is already registration with this email")
          .equals(user.email);

        const errors = req.validationErrors();
        if (!errors) {
          // const user = {
          //  username: };
          // userService.saveUser(user);
          // req.redirect("/")
        }

        req.session.errors = errors;
        res.render("", { err: errors });
      });
  });

module.exports = controller;
