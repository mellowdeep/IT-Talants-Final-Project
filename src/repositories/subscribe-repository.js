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
      "ON u.id = s.user_id" +
      "WHERE u.id = ?",
      userId
    )
  }
};

module.exports = query;
