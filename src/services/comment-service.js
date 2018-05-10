const repository = require('../repositories/comment-repository');
const videoService = require('../services/video-service');
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
  getCommentsForVideo: uuid =>
    videoService
      .getOneByUUID(uuid)
      .then(videoId => repository.getCommentsByVideoId(videoId))
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
};

module.exports = commentFunction;
