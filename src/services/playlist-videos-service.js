const repository = require('../repositories/playlist-videos-repository');
const videoService = require('../services/video-service');
const playlistService = require('../services/playlist-service');

const getVideoID = uuid =>
  videoService.getOneByUUID(uuid).then(video => {
    if (video) return video.id;
    throw "Not found";
  });

const playlistVideosFunction = {
  addVideo: (playlistId, videoUUID, userId) =>
    playlistService.getOwnPlaylist(playlistId, userId)
      .then(getVideoID(videoUUID))
      .then(videoId => repository.addVideoToPlaylist(playlistId, videoId, userId))
      .then(id => id)
};

module.exports = playlistVideosFunction;
