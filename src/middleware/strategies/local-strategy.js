const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const hash = require('../password');

const userService = require('../../services/user-service');

const BLOCKED = 'blocked';

module.exports = () => {
  passport.use(
    new LocalStrategy((username, password, done) =>
      userService
        .getUser(username, null)
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'Invalid Credentials' });
          }

          if (!hash.comparePasswordAndHash(password, user.password)) {
            return done(null, false, { message: 'Invalid Credentials' });
          }

          if (user.status.toLowerCase() === BLOCKED) {
            return done(null, false, { message: 'User Blocked!' });
          }

          delete user.password;
          return done(null, user);
        })
        .catch(err => console.log(err))
  ));
};
