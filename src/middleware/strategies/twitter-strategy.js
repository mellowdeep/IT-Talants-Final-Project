const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const keys = require('../../../keys');
const userService = require('../../services/user-service');

module.exports = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: keys.twitterKey,
        consumerSecret: keys.twitterSecret,
        callbackURL: "https://127.0.0.1:443/twitter/callback",
        includeEmail: true,
        passReqToCallback: true
      },
      (req, accessToken, tokenSecret, profile, done) => {
        const user = {
          id: profile.id.toString().slice(0,18),
          username: profile._json.email,
          image: profile._json.profile_image_url,
          name: profile.displayName,
          provider: "twitter",
          twitter: {
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
