const repository = require("../repositories/video-repository");

const videoFunction = {
  getOneByUUID: (uuid) => {
    repository.findByUUID(uuid).then(video => {
      if (video) {
        return {
          // id: user.id,
          // name: user.username
        };
      }

      return video;
    })
  }

};


module.exports = videoFunction;
