const db = require("../config/db");

const query = {
  addVideoToPlaylist(playlistId, videoId) {
    return db.insertObj(
      "INSERT INTO videos_playlists(video_id, playlist_id) VALUES(?,?)", [
        videoId,
        playlistId
      ]
    )
  }


};

module.exports = query;
