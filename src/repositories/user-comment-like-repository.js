const db = require('../config/db');

const query = {
  addLike(userId, commentId, likeSign) {
    return db.insertObj(
      'INSERT INTO comments_users_likes(user_id, comment_id, like_sign) VALUES(?,?,?)',
      [userId, commentId, likeSign],
    );
  },
};

module.exports = query;
