const db = require('../config/db');

const query = {
  addRate(userId, videoId, likeSign, dislikesSign) {
    return db.insertObj(
      'INSERT INTO users_videos_likes(user_id, videos_id, like_sign, dislike_sign) VALUES(?,?,?,?)',
      [userId, videoId, likeSign, dislikesSign],
    );
  },
  updateRate(userId, videoId, likeSign, dislikeSign) {
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
  findVideoWithUserRate(userId, videoId) {
    return db.getSingleResult(
      "SELECT * FROM users_videos_likes AS uvl " +
      "JOIN videos AS v " +
      "ON v.id = uvl.videos_id " +
      "WHERE v.id = ? OR " +
      "(uvl.user_id = ? AND uvl.videos_id = ?) ",
      [videoId, userId, videoId]
    )
  }
};

module.exports = query;
