const repository = require('../repositories/playlist-videos-repository');
const videoService = require('../services/video-service');
const playlistService = require('../services/playlist-service');

const playlistVideosFunction = {
  addVideo: (playlistId, videoUUID, userId) =>
    playlistService
      .getOwnPlaylist(playlistId, userId)
      .then(videoService.getOneByUUID(videoUUID))
      .then(video =>
        repository.addVideoToPlaylist(playlistId, video.id, userId),
      )
      .then(id => id),
  getVideosByPlaylist: playlistId =>
    repository.findVideosByPlaylistId(playlistId).then(videos => {
      if (videos) return videos;
      throw new Error('Video not found');
    }),
  deleteVideoFromPlaylist: (playlistId, videoUUID) =>
    videoService
      .getOneByUUID(videoUUID)
      .then(video => repository.removeVideoFromPlaylist(playlistId, video.id))
      .then(rows => {
        if (rows) return rows;
        throw new Error('Unable to delete video');
      }),
};

module.exports = playlistVideosFunction;
