const db = require("../config/db");


const query = {
  saveComment(comment, videoId) {
    return db.insertObj(
      "INSERT INTO comments (text, user_id, video_id, post_date) VALUES (?, ?, ?, ?)",
      [
        comment.text,
        comment.userId,
        videoId,
        comment.postDate,

      ]
    );
  },
  getCommentsByVideoId(id) {
    return db.getMultipleResult(
      "SELECT * FROM comments AS c WHERE c.video_id = ? ORDERY BY c.post_date DESC", id
    )
  }
};

module.exports = query;
