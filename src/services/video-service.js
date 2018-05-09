const repository = require("../repositories/video-repository");

const videoFunction = {
  getOneByUUID: (uuid) =>
    repository.findByUUID(uuid).then(video => {
      if (video) return video.id;
      return video;
    })
};


module.exports = videoFunction;
