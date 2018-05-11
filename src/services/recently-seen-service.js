const repository = require('../repositories/recently-seen-repository');

const recentlyFunction = {
  addVideo: (videoId, userId, seenDate) =>
    repository.findOneByVideoIdAndUserId(videoId, userId)
      .then(seen => seen ?
        repository.updateRecenltySeen(videoId, userId, seenDate) :
        repository.addRecentlySeen(videoId, userId, seenDate))
      .then(id => id),
  getRecentlyVideos: (userId) => {
    repository.getLastWatchedVideos(userId)
      .then()

  }
};

module.exports = recentlyFunction;
