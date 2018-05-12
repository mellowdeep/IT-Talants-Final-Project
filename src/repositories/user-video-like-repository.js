const db = require('../config/db');

const query = {
  addLike(userId, videoId, likeSign) {
    return db.insertObj(
      'INSERT INTO users_videos_likes(user_id, videos_id, like_sign) VALUES(?,?,?)',
      [userId, videoId, likeSign],
    );
  },
  updateLike(userId, videoId, likeSign) {
    return db.updateObj(
      'UPDATE users_videos_likes set like_sign = ? WHERE user_id = ? AND videos_id = ?',
      [likeSign, userId, videoId],
    );
  },
  findLike(userId, videoId) {
    return db.getSingleResult(
      'SELECT * FROM users_videos_likes WHERE user_id = ? AND videos_id = ?',
      [userId, videoId],
    );
  },
};

module.exports = query;
