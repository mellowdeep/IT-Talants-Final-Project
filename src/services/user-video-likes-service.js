const repository = require('../repositories/user-video-like-repository');

const userVideoFunction = {
  addLike: (userId, videoId, likeSign) =>
    repository.addLike(userId, videoId, likeSign)
      .then(id => {
        if(id) return id;
        throw new Error("Video not found")
      }),
  updateLike: (userId, videoId, likeSign) =>
    repository.updateLike(userId, videoId, likeSign)
      .then(id => {
        if (id) return id;
        throw new Error("Video not found")
      }),
  getLikeByVideoAndUser: (userId, videoId) =>
    repository.findLike(userId, videoId)
      .then(id => id),
};

module.exports = userVideoFunction;
