const repository = require('../repositories/video-repository');

const videoFunction = {
  getOneByUUID: uuid =>
    repository.findByUUID(uuid)
      .then(video => video),
  addVideo: videoObj =>
    repository.saveVideo(videoObj)
      .then(video => video),
};

module.exports = videoFunction;
