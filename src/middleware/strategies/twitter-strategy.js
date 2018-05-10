const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const userService = require('../../services/user-service');

module.exports = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: "HduEgbiJLwrNloX1ZxputuWrN",
        consumerSecret: "TjPYLnQsoFjdAXoowLlZKX4H1nPYQ8XEE73EeT1tHbfCUC4NTt",
        callbackURL: "http://localhost:3000/twitter/callback",
        includeEmail: true,
        passReqToCallback: true
      },
      (req, accessToken, tokenSecret, profile, done) => {
        const user = {
          username: profile._json.email,
          image: profile._json.profile_image_url,
          name: profile.displayName,
          provider: "twitter",
          status: "active",
          twitter: {
            id: profile.id,
            token: accessToken
          }
        };

        userService.getUserByUserName(user.email, user.provider, currentUser => {
          if (!currentUser) {
            userService.saveUser(user);
          }

          done(null, user);
        });
      }
    )
  );
};
