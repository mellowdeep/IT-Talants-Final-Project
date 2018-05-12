const passport = require('passport');
const userService = require("../services/user-service");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) =>
    done(null, user)
  );
  passport.deserializeUser((user, done) => {
    userService.getUserByUserName(user.username, user.provider).then(dbUser => {
      done(null, dbUser);
    });
  });

  require("./strategies/local-strategy")();
  require("./strategies/google-strategy")();
  require("./strategies/twitter-strategy")();
};
