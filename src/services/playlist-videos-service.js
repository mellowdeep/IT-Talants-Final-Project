const repository = require('../repositories/playlist-videos-repository');
const videoService = require('../services/video-service');
const playlistService = require('../services/playlist-service');
const status = require("../config/status-code");


const playlistVideosFunction = {
  addVideo: (playlistId, videoUUID, userId) =>
    playlistService.getOwnPlaylist(playlistId, userId)
      .then(videoService.getOneByUUID(videoUUID))
      .then(videoId => repository.addVideoToPlaylist(playlistId, videoId, userId))
      .then(id => id),
  getVideosByPlaylist: (playlistId) =>
    repository.findVideosByPlaylistId(playlistId)
      .then(videos => {
        if(videos) return videos;
        throw {message:'Videos not found',
          statusCode: status.NOT_FOUND};
      }),
  deleteVideoFromPlaylist: (playlistId, videoUUID) =>
    videoService.getOneByUUID(videoUUID)
     .then(videoId => repository.removeVideoFromPlaylist(playlistId, videoId))
      .then(rows => {
        if(rows) return rows;
        throw {
          message: 'Cannot delete video',
          statusCode: status.INTERNAL_SERVER_ERROR
        };
      }),
};

module.exports = playlistVideosFunction;
