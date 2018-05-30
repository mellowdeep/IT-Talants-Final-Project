const db = require('../config/db');

const query = {
  addSubscription(userId, subscribedUserId) {
    return db.insertObj(
      "INSERT INTO subscribe(user_id, subscribe_user_id) VALUES(?,?)",
      [userId, subscribedUserId]
    )
  },
  removeSubscription(userId, subscribedUserId) {
    return db.deleteObj(
      "DELETE FROM subscribe WHERE user_id = ? AND subscribe_user_id = ?",
      [userId, subscribedUserId]
    )
  },
  findAllSubscribedUsers(userId) {
    return db.getMultipleResult(
      "SELECT * FROM subscribe AS s " +
      "JOIN users AS u " +
      "ON u.id = s.subscribe_user_id " +
      "WHERE s.user_id = ?",
      userId
    )
  },
  findSubscription(userId, subscribeToUserId) {
    return db.getSingleResult(
      "SELECT s.id, (SELECT COUNT(su.id) FROM subscribe AS su WHERE su.subscribe_user_id = ?) AS subscribesCount " +
      "FROM subscribe AS s WHERE s.user_id = ? AND s.subscribe_user_id = ?",
      [subscribeToUserId, userId, subscribeToUserId]
    )
  }
};

module.exports = query;
