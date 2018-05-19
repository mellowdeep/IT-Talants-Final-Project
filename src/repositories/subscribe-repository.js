const db = require('../config/db');

const query = {
  addSubscribtion(userId, subscribedUserId) {
    return db.insertObj(
      "INSERT INTO subscribe(user_id, subscribe_user_id) VALUES(?,?)",
      [userId, subscribedUserId]
    )
  },
  removeSubcription(userId, subscribedUserId) {
    return db.deleteObj(
      "DELETE FROM subscribe WHERE user_id = ? AND subscribe_user_id = ?",
      [userId, subscribedUserId]
    )
  }
};

module.exports = query;
