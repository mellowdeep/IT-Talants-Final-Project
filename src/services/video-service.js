const repository = require('../repositories/video-repository');
const userVideoLikesService = require('../services/user-video-likes-service');
const userService = require('../services/user-service');

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
  updateVideo: (obj, id) =>
    videoFunction.getVideoById(id)
      .then(video => {
        const name = obj.name || video.name;
        const about = obj.about || video.about;
        const tag = obj.tag || video.tag;
        const visibility = obj.visibility || video.visibility;
        const status = obj.status || video.status;
        const likes = obj.likes_count || video.likes_count;
        return repository.updateVideo(name, about, tag, visibility, status, likes, video.id)
      })
      .then(row => row),

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
          video.status,
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
  getAllByMatchName:(keyword) =>
    repository.fallByMatchName(keyword)
      .then(videos => videos),
  increaseCounter: (video) =>
    repository.increaseCounter(video.id, ++video.play_count)
      .then(row => {
        if (row) return row;
        throw new Error('Unable to increase play counter');
    }),
  getVideosByStatus: (status) =>
    repository.findByStatus(status)
      .then(videos => videos),
  getVideoById: (id) =>
    repository.getVideoById(id)
      .then(video => {
        if(video) return video;
        throw new Error("Video not found");
      }),
  getVideosByUserId: (userId, status) =>
    userService.getUserById(userId)
      .then(user => {
        if(user) return user.id;
        throw new Error('User not found');
      })
      .then(id => repository.findAllByUserId(id,status))
      .then(videos => videos)
};

module.exports = videoFunction;
