const repository = require('../repositories/userRepository');
const hash = require('../config/password');

const userFunction = {
  getUserByUserName: username => repository.findByUserName(username).then(data =>
      data.map(obj => ({
          id: obj.id,
          name: obj.username,
        })),
    ),
  getUserById: id => repository.findById(id).then(data =>
      data.map(obj => ({
          id: obj.id,
          name: obj.username,
        })),
    ),
  getUser: (username, password) => repository
      .findByUserNameAndPassword(username, hash(password))
      .then(data =>
        data.map(obj => ({
            id: obj.id,
            name: obj.username,
          })),
      )
};
