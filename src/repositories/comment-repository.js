const db = require('../config/db');

const query = {
  saveComment(comment, videoId) {
    return db.insertObj(
      'INSERT INTO comments (text, user_id, video_id, post_date) VALUES (?, ?, ?, ?)',
      [comment.text, comment.userId, videoId, comment.postDate],
    );
  },
  getCommentByIdAndUserId(id, userId) {
    return db.getMultipleResult(
      'select c.id, c.text, c.post_date, u.name, j.like_sign from comments AS c ' +
      'left join users as u ' +
      'on u.id = c.user_id ' +
      'left join (select cul.comment_id, cul.like_sign from comments_users_likes as cul  ' +
      'join users as u ' +
      'on u.id = cul.user_id ' +
      'where u.id = ?) as j ' +
      'on j.comment_id = c.id ' +
      'where c.video_id = ?  ' +
      'ORDER BY c.post_date DESC',
       [userId,id]
    );
  },
  deleteComment(videoId, commentId, userId) {
    return db.deleteObj(
      'DELETE FROM comments  WHERE id = ? AND video_id = ? AND (user_id = ? OR (select u.role from users as u where u.id = ?) = admin)',
      [commentId, videoId, userId, userId],
    );
  },
  updateComment(videoId, text, likes, commentId) {
    return db.updateObj(
      'UPDATE comments SET  text = ?, video_id = ?, likes_count = ? WHERE id = ? ',[text, videoId, likes, commentId],
    );
  },
  findByVideoAndCommentID(videoId, commentId) {
    return db.getSingleResult(
      "SELECT * FROM comments AS c WHERE c.id = ? and c.video_id = ?", [commentId, videoId]
    )
  }
};

module.exports = query;
