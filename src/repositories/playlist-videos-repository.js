const db = require("../config/db");

const query = {
  addVideoToPlaylist(playlistId, videoId) {
    return db.insertObj(
      "INSERT INTO videos_playlists(video_id, playlist_id) VALUES(?,?)", [
        videoId,
        playlistId
      ]
    )
  },
  findVideosByPlaylistId(playlistId) {
    return db.getMultipleResult(
      "SELECT * FROM playlists AS p " +
      "join videos_playlists AS vp " +
      "on vp.playlist_id = v.id " +
      "join videos AS v " +
      "on v.id = vp.video_id " +
      "WHERE p.id = ?", playlistId
    )
  },
  removeVideoFromPlaylist(playlistId, videoId){
    return db.deleteObj(
      "DELETE FROM videos_playlists WHERE video_id = ? AND playlist_id = ?", [videoId, playlistId]
    )
  }


};

module.exports = query;
