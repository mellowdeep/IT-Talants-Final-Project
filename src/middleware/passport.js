const passport = require('passport');
const userService = require("../services/user-service");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) =>
    done(null, user.id)
  );
  passport.deserializeUser((id, done) => {
    userService.getUserById(id).then(dbUser => {
      done(null, dbUser);
    });
  });

  require("./strategies/local-strategy")();
  require("./strategies/google-strategy")();
  require("./strategies/twitter-strategy")();
  require("./strategies/facebook.strategy")();
};
