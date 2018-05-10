const repository = require('../repositories/video-repository');
const status = require("../config/status-code");

const videoFunction = {
  getOneByUUID: uuid =>
    repository.findByUUID(uuid)
      .then(video => {
      if (video) return video;
        throw {message:'Video not found',
          statusCode: status.NOT_FOUND};
    }),
  addVideo: videoObj => repository.saveVideo(videoObj)
    .then(video => {
      if (video) return video;
      throw {
        message: 'Cannot add video',
        statusCode: status.INTERNAL_SERVER_ERROR
      };
    }),
  deleteVideo: (uuid, userId) =>
    repository.deleteVideo(uuid, userId)
      .then(rows => {
        if (rows) return rows;
        throw {
          message: 'Cannot delete video',
          statusCode: status.INTERNAL_SERVER_ERROR
        };
      }),
};

module.exports = videoFunction;
