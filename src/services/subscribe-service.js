const repository = require('../repositories/subscribe-repository');

const subscribeFunction = {
  addSubscribtion:(userId, subscribedToUserId) =>
    repository.addSubscribtion(userId, subscribedToUserId)
      .then(id => {
        if(id) {
          return id;
        }

        throw new Error("Unable to add subscription");
      }),
  removeSubscribe:(userId, subscribedToUserId) =>
    repository.removeSubcription(userId, subscribedToUserId)
      .then(row => {
        if(row) {
          return row;
        }

        throw new Error("Unable to remove subscription");
      }),


};

module.exports = subscribeFunction;
