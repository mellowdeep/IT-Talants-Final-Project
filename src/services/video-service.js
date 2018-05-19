const repository = require('../repositories/video-repository');
const userVideoLikesService = require('../services/user-video-likes-service');
const userService = require('../services/user-service');

const mapVideo = video => ({
    id: video.id,
    name: video.name,
    about: video.about,
    tag: video.tag,
    playCount: video.play_count || 0,
    likeSign: video.like_sign || 0,
    dislikeSign: video.dislike_sign || 0,
    likesCount: video.likes_count || 0,
    dislikesCount: video.dislikes_count || 0,
    highQuality: video.high_quality,
    lowQuality: video.low_quality,
    image: video.image,
    duration: video.duration
  });

const videoFunction = {
  getOneByUUID: (uuid) =>
    repository.findByUUID(uuid)
      .then(video => {
        if (video) {
          return mapVideo(video);
        }

      throw new Error('Video not found');
      }),
  getVideoByIdAndUserRate: (videoId, userId) =>
    userVideoLikesService.findVideoWithUserRate(userId,videoId)
      .then(video => {
        if(video) {
          return mapVideo(video);
        }

        return video;
      }),
  addVideo: videoObj =>
    repository.saveVideo(videoObj)
      .then(videoId => {
        if (videoId) return videoId;
        throw new Error('Unable to upload video');
      }),
  deleteVideo: (uuid, userId) =>
    repository.deleteVideo(uuid, userId)
      .then(rows => {
        if (rows) return rows;
        throw new Error('Unable to delete video');
      }),
  getVideosByTag: tag =>
    repository.findByTag(tag)
      .then(videos => {
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
        const likes = obj.likesCount || video.likesCount;
        return repository.updateVideo(name, about, tag, visibility, status, likes, video.id)
      })
      .then(row => row),
  addRemoveLike: (video, userId, isLike) =>
    repository.updateVideo(
          video.name,
          video.about,
          video.tag,
          video.visibility,
          video.status,
          isLike ? ++video.likesCount : --video.likesCount,
          video.dislikesCount,
          video.id,
        )
      .then(rows => {
        if (rows) return rows;
        throw new Error('Unable to rate video');
      }),
  addRemoveDislike: (video, userId, isDislike) =>
    repository.updateVideo(
          video.name,
          video.about,
          video.tag,
          video.visibility,
          video.status,
          video.likesCount,
          isDislike ? ++video.dislikesCount : --video.dislikesCount,
          video.id
      )
      .then(rows => {
        if (rows) return rows;
        throw new Error('Unable to rate video');
      }),
  getAllByMatchName:(keyword) =>
    repository.findByMatchName(keyword)
      .then(videos => {
        if(Array.isArray(videos)){
          return videos.map(v => mapVideo(v));
        }

        return videos;
      }),
  increaseCounter: (video) =>
    repository.increaseCounter(video.id, ++video.playCount)
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
