const passport = require('passport');
const CustomStrategy = require('passport-custom').Strategy;

const userService = require('../../services/user-service');

module.exports = () => {
  passport.use('custom-facebook',
    new CustomStrategy((res, done) => {

      const {response, accToken} = res.body;
      const user = {
        id: response.id.toString()
          .slice(0, 18),
        username: response.email,
        image: response.picture.data.url,
        name: response.name,
        provider: "facebook"
      };
      userService
        .getUserById(user.id)
        .then(dbUser => {
          if (!dbUser) {
            return userService.saveUser(user.id, user.email, null, user.name,
              'user', 'active', user.provider, user.image);
          }

          return dbUser;
        })
        .then(currUser => done(null, currUser))
        .catch(err => console.log(err))

    }))
};
