const db = require('../config/db');

const query = {
  addLike(userId, commentId, likeSign) {
    return db.insertObj(
      'INSERT INTO comments_users_likes(user_id, comment_id, like_sign) VALUES(?,?,?)',
      [userId, commentId, likeSign],
    );
  },
  updateLike(userId, commentId, likeSign) {
    return db.updateObj(
      'UPDATE comments_users_likes set like_sign = ? WHERE user_id = ? AND comment_id = ?',
      [likeSign, userId, commentId],
    );
  },
  findLike(userId, commentId) {
    return db.getSingleResult(
      'SELECT * FROM comments_users_likes WHERE user_id = ? AND comment_id = ?',
      [userId, commentId],
    );
  },
};

module.exports = query;
