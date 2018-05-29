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
      "JOIN videos_playlists AS vp " +
      "ON vp.playlist_id = p.id " +
      "JOIN videos AS v " +
      "ON v.id = vp.video_id " +
      "WHERE p.id = ? AND v.status IS NOT ?", [playlistId, 'blocked']
    )
  },
  removeVideoFromPlaylist(playlistId, videoId){
    return db.deleteObj(
      "DELETE FROM videos_playlists WHERE video_id = ? AND playlist_id = ?", [videoId, playlistId]
    )
  }


};

module.exports = query;
