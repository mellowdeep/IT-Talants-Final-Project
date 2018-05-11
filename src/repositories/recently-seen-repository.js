const db = require("../config/db");

const query = {
  findOneByVideoIdAndUserId(videoId, userId) {
    return db.getSingleResult(
      "SELECT * FROM recently_seen AS rc WHERE rc.video_id = ? AND rc.user_id = ?", [videoId, userId]
    )
  },
  addRecentlySeen(videoId, userId, seenDate) {
    return db.getSingleResult(
      "INSERT INTO recently_seen(video_id, user_id, seen_date) VALUES (?,?,?)", [videoId, userId, seenDate]
    )
  },
  updateRecenltySeen(videoId, userId, seenDate) {
    return db.updateObj(
      "UPDATE recently_seen SET seen_date = ? WHERE user_id = ? AND video_id = ?", [seenDate, userId, videoId]
    )
  },
  getLastWatchedVideos(userId) {
    return db.getMultipleResult(
      "SELECT * FROM videos AS v " +
      "join recently_seen as rc " +
      "on rc.video_id = v.id " +
      "WHERE rc.user_id = ?" +
      "ORDER BY rc.seen_date DESC " +
      "LIMIT 10", userId
    )
  }
};

module.exports = query;
