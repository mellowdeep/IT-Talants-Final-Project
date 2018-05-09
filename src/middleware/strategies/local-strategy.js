const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userService = require("../../services/user-service");

const BLOCKED = "blocked";

module.exports = () => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      userService
        .getUser(username, password, null)
        .then(user => {
          if (!user) {
            return done(null, false, {message: "Invalid Credentials"});
          }

          if(user.status.toLowerCase() === BLOCKED) {
            return done(null, false, {message: "User Blocked!"});
          }

          return done(null, user);
        })
        .catch(err => done(err));
    })
  );
};
