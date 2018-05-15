const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userService = require("../../services/user-service");

module.exports = () => {
  passport.use(new FacebookStrategy({
      clientID: '968381570005893',
      clientSecret: 'fc887b693c986d2355514313d7d534fa',
      callbackURL: "https://127.0.0.1:443/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    (accessToken, refreshToken, profile, done)  => {
      const user = {
        id: profile.id,
        username: profile.emails[0].value,
        image: profile.photos ? profile.photos[0].value : "",
        name: profile.displayName,
        provider: "facebook",
        facebook: {
          token: accessToken
        }
      };

      userService
        .getUserById(user.id)
        .then(currentUser => {
          if (!currentUser) {
            userService.saveUser(user.id, user.username, '', user.name, 'user', 'active', user.provider, user.image)
              .then(dbUser => {
                if (dbUser) done(null, dbUser);
              });
          } else {
            done(null, currentUser);
          }
        });
    }
    )
  );
};
