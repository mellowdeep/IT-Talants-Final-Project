const repository = require('../repositories/user-video-like-repository');

const userVideoFunction = {
  addRate: (userId, videoId, likeSign, dislikesSign) =>
    repository.addRate(userId, videoId, likeSign, dislikesSign)
      .then(id => {
        if(id) return id;
        throw new Error("Video not found")
      }),
  updateRate: (userId, videoId, likeSign, dislikeSign) =>
    repository.updateRate(userId, videoId, likeSign, dislikeSign)
      .then(id => {
        if (id) return id;
        throw new Error("Video not found")
      }),
  getLikeByVideoAndUser: (userId, videoId) =>
    repository.findLike(userId, videoId)
      .then(like => like),
  findVideoWithUserRate: (userId, videoId) =>
    repository.findVideoWithUserRate(userId, videoId)
      .then(like => like)
};

module.exports = userVideoFunction;
