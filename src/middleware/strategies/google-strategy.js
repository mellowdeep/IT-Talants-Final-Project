const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const keys = require('../../../keys');
const userService = require('../../services/user-service');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.goolgeKey,
        clientSecret: keys.googleSecret,
        callbackURL: "https://127.0.0.1:443/auth/google/callback"
      },
      (req, accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id.toString().slice(0,18),
          username: profile.emails[0].value,
          image: profile._json.image.url,
          name: profile.displayName,
          provider: "google",
          google: {
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
