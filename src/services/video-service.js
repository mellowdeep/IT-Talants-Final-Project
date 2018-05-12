const repository = require('../repositories/video-repository');
const userVideoLikesService = require('../services/user-video-likes-service');

const LIKE = 1;

const videoFunction = {
  getOneByUUID: uuid =>
    repository.findByUUID(uuid).then(video => {
      if (video) return video;
      throw new Error('Video not found');
    }),
  addVideo: videoObj =>
    repository.saveVideo(videoObj).then(videoId => {
      if (videoId) return videoId;
      throw new Error('Unable to upload video');
    }),
  deleteVideo: (uuid, userId) =>
    repository.deleteVideo(uuid, userId).then(rows => {
      if (rows) return rows;
      throw new Error('Unable to delete video');
    }),
  getVideosByTag: tag =>
    repository.findByTag(tag).then(videos => {
      if (videos) return videos;
      throw new Error('Video not found');
    }),
  addRemoveLike: (uuid, userId, isLike) => {
    let videoId;
    return videoFunction
      .getOneByUUID(uuid)
      .then(video => {
        videoId = video.id;
        return repository.updateVideo(
          video.name,
          video.about,
          video.tag,
          video.visibility,
          isLike ? ++video.likes_count : --video.likes_count,
          videoId,
        );
      })
      .then(rows => {
        if (rows) return rows;
        throw new Error('Unable to like/unlike video');
      })
      .then(() => userVideoLikesService.getLikeByVideoAndUser(userId, videoId))
      .then(
        like =>
          like
            ? userVideoLikesService.updateLike(userId, videoId, isLike)
            : userVideoLikesService.addLike(userId, videoId, LIKE),
      )
      .then(id => id);
  },
  increaseCounter: (video) =>
    repository.increeceWatchCounter(video.id, ++video.play_count)
      .then(row => {
        if (row) return row;
        throw new Error('Unable to increase play counter');
    }),
};

module.exports = videoFunction;
