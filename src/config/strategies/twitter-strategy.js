const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
  passport.use(new TwitterStrategy(
    {
      consumerKey: 'HduEgbiJLwrNloX1ZxputuWrN',
      consumerSecret: 'TjPYLnQsoFjdAXoowLlZKX4H1nPYQ8XEE73EeT1tHbfCUC4NTt',
      callbackURL: 'http://localhost:3000/twitter/callback',
      includeEmail: true,
      passReqToCallback: true,
    },
    (req, accessToken, tokenSecret, profile, done) => {
      const user = {
        email: profile._json.email,
        image: profile._json.profile_image_url,
        name: profile.displayName,
        twitter: {
          id: profile.id,
          token: accessToken,
        },
      };
      done(null, user);
    },
  ));
};
