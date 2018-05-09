const repository = require('../repositories/user-repository');
const hash = require('../middleware/password');

const userFunction = {
  getUserByUserName: (username, provider) =>
    repository.findByUserName(username, provider).then(user => {
      if (user) {
        return {
          id: user.id,
          name: user.username
        };
      }
      return user;
    }),
  getUserById: id =>
    repository.findById(id).then(user => {
      if (user) {
        return {
          id: user.id,
          name: user.username
        };
      }
      return user;
    }),
  getUser: (username, password) =>
    repository
      .findByUserNameAndPassword(username, hash.getPasswordHash(password))
      .then(user => {
        if (user) {
          return {
            id: user.id,
            name: user.username
          };
        }
        return user;
      }),
  saveUser: (username, password) =>
    repository
      .saveUser(username, hash.getPasswordHash(password))
      .then(id => repository.findById(id))
      .then(user => {
        if (user) {
          return {
            id: user.id,
            name: user.username,
            image: user.image,
            status: user.status
          };
        }

        return user;
      })
};

module.exports = userFunction;
