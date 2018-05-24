const repository = require('../repositories/subscribe-repository');
const userService = require('./user-service');

const subscribeFunction = {
  addSubscription:(userId, subscribedToUserId) =>
    repository.addSubscription(userId, subscribedToUserId)
      .then(id => {
        if(id) {
          return id;
        }

        throw new Error("Unable to add subscription");
      }),
  removeSubscribe:(userId, subscribedToUserId) =>
    repository.removeSubscription(userId, subscribedToUserId)
      .then(row => {
        if(row) {
          return row;
        }

        throw new Error("Unable to remove subscription");
      }),
  getAllSubscriptions: (userId) =>
    repository.findAllSubscribedUsers(userId)
      .then(users => {
        if (users) return users.map(u => userService.mappUser(u));
        return users;
      })
};

module.exports = subscribeFunction;
