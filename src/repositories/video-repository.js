const db = require('../config/db');

const query = {
  findByTag (tag) {
    return db.getMultipleResult(
      "SELECT * FROM videos AS v WHERE v.tag = ? AND v.visibility = ? LIMIT 10", [tag, 'public']
    )
  },
  updateVideo(name, about, tag, visibility, status, likes, videoId) {
    return db.updateObj(
      'UPDATE videos SET name = ?, about = ?, tag = ?, visibility = ?, status = ?, likes_count = ? WHERE id = ? ',
      [name, about, tag, visibility, status, likes, videoId],
    );
  },
  getVideoById(id) {
    return db.getSingleResult(
      "SELECT * FROM videos AS v WHERE v.id = ?", id
    );
  },
  increceWatchCounter(videoId, playCount) {
    return db.updateObj(
      "UPDATE videos SET play_count = ? WHERE id = ?", [playCount, videoId]
    )
  },
  findByUUID(uuid) {
    return db.getSingleResult(
      "SELECT * FROM videos AS v WHERE v.uuid = ?", uuid
    )
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
      'DELETE FROM videos AS v WHERE v.uuid = ? AND ' +
      '(v.user_id = ? OR ' +
      '(SELECT u.role FROM users as u WHERE u.id = ?) = admin)',
      [uuid, userId, userId],
    );
  },
  findByStatus(status) {
    return db.getMultipleResult(
      "SELECT * FROM videos AS v WHERE v.status = ?", status
    )
  },
};

module.exports = query;
