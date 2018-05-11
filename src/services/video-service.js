const repository = require('../repositories/video-repository');
const status = require("../config/status-code");

const videoFunction = {
  getOneByUUID: uuid =>
    repository.findByUUID(uuid)
      .then(video => {
      if (video) {
        repository.increeceWatchCounter(video.id, ++video.play_count);
        return video;
      }

        throw new Error("Video not found");
    }),
  addVideo: videoObj => repository.saveVideo(videoObj)
    .then(video => {
      if (video) return video;
      throw new Error("Unable to upload video");
    }),
  deleteVideo: (uuid, userId) =>
    repository.deleteVideo(uuid, userId)
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to delete video");
      }),
  getVideosByTag:(tag) =>
    repository.findByTag(tag)
      .then(videos => {
        if (videos) return videos;
        throw new Error("Video not found");
      }),
};

module.exports = videoFunction;
