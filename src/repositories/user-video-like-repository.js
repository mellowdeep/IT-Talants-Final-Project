const db = require('../config/db');

const query = {
  addRate(userId, videoId, likeSign, dislikesSign) {
    return db.insertObj(
      'INSERT INTO users_videos_likes(user_id, videos_id, like_sign, dislikes_sign) VALUES(?,?,?,?)',
      [userId, videoId, likeSign, dislikesSign],
    );
  },
  updateLike(userId, videoId, likeSign, dislikeSign) {
    return db.updateObj(
      'UPDATE users_videos_likes set like_sign = ?, dislike_sign = ? WHERE user_id = ? AND videos_id = ?',
      [likeSign, dislikeSign, userId, videoId],
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
