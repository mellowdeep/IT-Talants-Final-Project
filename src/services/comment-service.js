const repository = require('../repositories/comment-repository');
const videoService = require('../services/video-service');
const userCommentLikesService = require('../services/user-comment-likes-service');
const status = require('../config/status-code');

const commentFunction = {
  addComment: (comment, uuid) =>
    videoService
      .getOneByUUID(uuid)
      .then(videoId => repository.saveComment(comment, videoId))
      .then(commentId => {
        if (commentId) return commentId;
        throw {
          message: 'Comment not found',
          statusCode: status.NOT_FOUND,
        };
      }),
  getCommentsForVideo: (uuid, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(videoId => repository.getCommentByIdAndUserId(videoId, userId))
      .then(comments => {
        if (comments) return comments;
        throw 'Comments not found';
      }),
  deleteComment: (uuid, commentId, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(videoId => repository.deleteComment(videoId, commentId, userId))
      .then(rows => {
        if (rows) return rows;
        throw {
          message: 'Cannot delete  comment',
          statusCode: status.UNAUTHORIZED,
        };
      }),
  updateComment: (uuid, commentId, text, userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(videoId =>
        repository.updateComment(videoId, text, commentId, userId),
      )
      .then(rows => {
        if (rows) return rows;
        throw {
          message: 'Cannot delete  comment',
          statusCode: status.UNAUTHORIZED,
        };
      }),
  addLike: (videoUUID, commentId, userId) =>
    videoService
      .getOneByUUID(videoUUID)
      .then(videoId => repository.findByVideoAndCommentID(videoId, commentId))
      .then(comment => {
        if (!comment) {
          throw {
            message: 'Comment not found',
            statusCode: status.NOT_FOUND,
          };
        }

        const like = comment.likes_count++;
        repository
          .updateComment(
            comment.text,
            like,
            comment.id,
            comment.video_id,
            comment.user_id,
          )
          .then(rows => {
            if (rows) {
              userCommentLikesService
                .addLike(userId, commentId, 1)
                .then(id => id);
            }
            throw {
              message: 'Cannot add lie',
              statusCode: status.INTERNAL_SERVER_ERROR,
            };
          });
      }),
};

module.exports = commentFunction;
