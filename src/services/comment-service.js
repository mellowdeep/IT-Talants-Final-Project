const repository = require('../repositories/comment-repository');
const videoService = require('../services/video-service');
const userCommentLikesService = require('../services/user-comment-likes-service');
const status = require('../config/status-code');

const commentFunction = {
  addComment: (comment, uuid) =>
    videoService
      .getOneByUUID(uuid)
      .then(video => repository.saveComment(comment, video.id))
      .then(commentId => {
        if (commentId) return commentId;
        throw new Error("Comment not found")
      }),
  getCommentsForVideo: (uuid, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(video => repository.getCommentByIdAndUserId(video.id, userId))
      .then(comments => {
        if (comments) return comments;
        throw new Error("Comment not found")
      }),
  deleteComment: (uuid, commentId, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(video => repository.deleteComment(video.id, commentId, userId))
      .then(rows => {
        if (rows) return rows;
        throw new Error("Cannot delete comment")
      }),
  updateComment: (uuid, commentId, text, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(video =>
        repository.updateComment(video.id, text, commentId, userId),
      )
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to delete comment")
      }),
  addRemoveLike: (videoUUID, commentId, userId, isLike) =>
    videoService
      .getOneByUUID(videoUUID)
      .then(video => repository.findByVideoAndCommentID(video.id, commentId))
      .then(comment => {
        if (comment) return comment;
        throw new Error("Comment not found")
      })
      .then(comment =>
        repository.updateComment(
          comment.video_id,
          comment.text,
          (isLike ? ++comment.likes_count: --comment.likes_count),
          comment.id,
        ))
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to like/unlike comment")
      })
      .then(() => userCommentLikesService.getLikeByCommentAndUser(userId, commentId))
      .then(like  => like ? userCommentLikesService.updateLike(userId, commentId, isLike):
          userCommentLikesService.addLike(userId, commentId, 1))
      .then(id => id),
};

module.exports = commentFunction;
