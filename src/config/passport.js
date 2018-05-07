const passport = require('passport');
const userService = require("../services/user-service");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) =>
    done(null, user.id)
  );
  passport.deserializeUser((user, done) => {
    userService.getUserById(user.id).then(user => {
      done(null, user);
    });
  });

  require("./strategies/local-strategy")();
  require("./strategies/google-strategy")();
  require("./strategies/twitter-strategy")();
};
