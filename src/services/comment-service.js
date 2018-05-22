const repository = require('../repositories/comment-repository');
const videoService = require('../services/video-service');
const userCommentLikesService = require('../services/user-comment-likes-service');

const INIT_VALUE = 1;
const ZERO = 0;

const mapComment = comment => ({
  id: comment.id,
  text: comment.text,
  videoId: comment.video_id,
  userId: comment.user_id,
  likesCount: comment.likes_count,
  dislikesCount: comment.dislikes_count,
  postDate: comment.post_date,
  likeSign: comment.like_sign,
  dislikeSign: comment.dislike_sign,
  userImage: comment.image,
  name: comment.name,
  uuid: comment.uuid,
});

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
        if (comments) return comments.map(c => mapComment(c));
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
  updateComment: (uuid, commentId, text, likesCount, dislikesCount,  userId) =>
    videoService
      .getOneByUUID(uuid)
      .then(video =>
        repository.getCommentByIdAndUserIdAndVideoId(video.id, commentId, userId)
      )
      .then(comment => {
        if (!comment) throw new Error("Comment not found");
        const currComment = mapComment(comment);
        return repository.updateComment(currComment.videoId, text, likesCount, dislikesCount, commentId, userId);
      })
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to delete comment")
      }),
  addRemoveLike: (videoUUID, commentId, userId, isLike) =>
    videoService
      .getOneByUUID(videoUUID)
      .then(video => repository.getCommentByIdAndVideoId(video.id, commentId))
      .then(comment => {
        if (comment) return mapComment(comment);
        throw new Error("Comment not found");
      })
      .then(comment =>
        repository.updateComment(
          comment.text,
          (isLike ? ++comment.likesCount: --comment.likesCount),
          comment.dislikesCount,
          comment.id,
        ))
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to like/unlike comment")
      })
      .then(() => userCommentLikesService.getLikeByCommentAndUser(userId, commentId))
      .then(like  =>
        like ?
          userCommentLikesService.updateRate(userId, commentId, isLike, like.dislike_sign) :
          userCommentLikesService.addRate(userId, commentId, INIT_VALUE, ZERO)),
  addRemoveDislike: (videoUUID, commentId, userId, isDislike) =>
    videoService
      .getOneByUUID(videoUUID)
      .then(video => repository.getCommentByIdAndVideoId(video.id, commentId))
      .then(comment => {
        if (comment) return mapComment(comment);
        throw new Error("Comment not found")
      })
      .then(comment =>
        repository.updateComment(
          comment.text,
          comment.likesCount,
          isDislike ? ++comment.dislikesCount : --comment.dislikesCount,
          comment.id,
        ))
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to like/unlike comment")
      })
      .then(() => userCommentLikesService.getLikeByCommentAndUser(userId, commentId))
      .then(like  => like ? userCommentLikesService.updateRate(userId, commentId, like.like_sign, isDislike) :
        userCommentLikesService.addRate(userId, commentId, ZERO, INIT_VALUE)),
};

module.exports = commentFunction;
