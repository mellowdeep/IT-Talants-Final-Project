const passport = require('passport');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    // call user from db by valid identifier
    // User.findOne({email: user.email}, function (err, user) {
    // done(null, user);
    // });

    done(null, user);
  });

  require('./strategies/google-strategy')();
  require('./strategies/twitter-strategy')();
};
