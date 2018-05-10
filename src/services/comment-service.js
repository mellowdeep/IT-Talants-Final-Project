const repository = require("../repositories/comment-repository");
const videoService = require("../services/video-service");

const getVideoID = uuid =>
  videoService.getOneByUUID(uuid).then(video => {
    if (video) return video.id;
    return video;
  });


const commentFunction = {
  addComment: (comment, uuid) =>
    getVideoID(uuid)
      .then(videoId => repository.saveComment(comment, videoId))
      .then(commentId => commentId),
  getCommentsForVideo: uuid => {
    getVideoID(uuid)
      .then(videoId => repository.repository.getCommentsByVideoId(videoId))
      .then(comments => comments);
  }
};

module.exports = commentFunction;
