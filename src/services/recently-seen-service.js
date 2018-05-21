const repository = require('../repositories/recently-seen-repository');

const recentlyFunction = {
  addVideo: (videoId, userId, seenDate) =>
    repository.findOneByVideoIdAndUserId(videoId, userId)
      .then(seen => seen ?
        repository.updateRecenltySeen(videoId, userId, seenDate) :
        repository.addRecentlySeen(videoId, userId, seenDate))
      .then(id => id),
};

module.exports = recentlyFunction;
