const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const userService = require('../../services/user-service');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "490653670799-bjlvpp84e9f51hcubat696a84api7f04.apps.googleusercontent.com",
        clientSecret: "kJzzrpe67eSIXCoSXvvP-AmF",
        callbackURL: "https://127.0.0.1:443/auth/google/callback"
      },
      (req, accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
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
