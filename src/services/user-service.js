const repository = require('../repositories/user-repository');
const hash = require('../middleware/password');

const mappUserWithPassword = user => {
  const {id, name, role ,image, status, password} = user;
  return {id, name, role ,image, status, password};
};

const mappUser = user => {
  const {id, name, role ,image, status} = user;
  return {id, name, role ,image, status};
};

const userFunction = {
  getUserByUserName: (username, provider) =>
    repository.findByUserName(username, provider).then(user => {
      if (user) return mappUser(user);
      return user;
    }),
  getUserById: id =>
    repository.findById(id).then(user => {
      if (user) if (user) return mappUser(user);
      return user;
    }),
  getUser: (username, provider) =>
    repository
      .findByUserName(
        username,
        provider,
      )
      .then(user => {
        if (user) if (user) return mappUserWithPassword(user);
        return user;
      }),
  saveUser: (userId, username, password, name, role, status, provider, image) =>
    repository
      .saveUser(userId, username, hash.getPasswordHash(password), name, role, status, provider, image)
      .then(id => repository.findById(id))
      .then(user => {
        if (user) if (user) return mappUser(user);
        return user;
      }),
};

module.exports = userFunction;
