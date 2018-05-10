const db = require('../config/db');

const query = {
  findByUUID(uuid) {
    return db.getSingleResult(
      'SELECT * FROM videos AS v WHERE v.uuid = ?',
      uuid,
    );
  },
  saveVideo(videoObj) {
    return db.insertObj(
      'INSERT INTO videos(name, about, video, image, visibility, post_date, tag, uuid, user_id) ' +
        'VALUES(?,?,?,?,?,?,?,?,?)',
      [
        videoObj.name,
        videoObj.about,
        videoObj.video,
        videoObj.image,
        videoObj.visibility,
        videoObj.postDate,
        videoObj.tag,
        videoObj.uuid,
        videoObj.userId,
      ],
    );
  },
  deleteVideo(uuid, userId) {
    return db.deleteObj(
      'DELETE FROM videos AS v WHERE v.uuid = ? AND v.user_id = ? ',
      [uuid, userId],
    );
  },
};

module.exports = query;
