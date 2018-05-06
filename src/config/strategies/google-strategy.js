const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const userService = require('../../services/user-service');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '490653670799-bjlvpp84e9f51hcubat696a84api7f04.apps.googleusercontent.com',
        clientSecret: 'kJzzrpe67eSIXCoSXvvP-AmF',
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      (req, accessToken, refreshToken, profile, done) => {
        let user = {
          username: profile.emails[0].value,
          image: profile._json.image.url,
          name: profile.displayName,
          provider: 'google',
        };

        userService.getUserByUserName(
          user.username,
          user.provider,
          currentUser => {
            if (!currentUser) {
              user = userService.saveUser(user);
            }

            done(null, user);
          },
        );
      },
    ),
  );
};
