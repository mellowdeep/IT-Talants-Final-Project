const db = require('../config/db');

const query = {
  saveComment(comment, videoId) {
    return db.insertObj(
      'INSERT INTO comments (text, user_id, video_id, post_date) VALUES (?, ?, ?, ?)',
      [comment.text, comment.userId, videoId, comment.postDate],
    );
  },
  getCommentsByVideoId(id) {
    return db.getMultipleResult(
      'SELECT * FROM comments AS c WHERE c.video_id = ? ORDERY BY c.post_date DESC',
      id,
    );
  },
  getCommentByIdAndUserId(id, userId) {
    return db.getMultipleResult(
      'SELECT * FROM comments AS c WHERE c.id = ? AND c.user_id = ?',
      [id, userId],
    );
  },
  deleteComment(videoId, commentId, userId) {
    return db.deleteObj(
      'DELETE FROM comments AS c WHERE c.id = ? AND c.video_id = ? AND c.user_id = ?',
      [commentId, videoId, userId],
    );
  },
  updateComment(videoId, text, likes, commentId, userId) {
    return db.updateObj(
      'UPDATE comments SET text = ?, likes_count = ? WHERE c.id = ? AND c.video_id = ? AND c.user_id = ?',
      [text, likes, commentId, videoId, userId],
    );
  },
  findByVideoAndCommentID(videoId, commentId) {
    return db.getSingleResult(
      "SELECT * FROM  comments AS c WHERE c.id = ? AND c.video_id = ?", [commentId, videoId]
    )
  }
};

module.exports = query;
