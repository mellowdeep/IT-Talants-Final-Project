const db = require("../config/db");

const query = {
  savePlaylist(playlist) {
    return db.insertObj(
      "INSERT INTO playlists(name, user_id, visibility) VALUES(?,?,?)", [
        playlist.name,
        playlist.userId,
        playlist.visibility
      ]
    )
  },
  findOwnPlaylist(id, userId) {
    return db.getSingleResult(
      "SELECT * FROM playlists as p  " +
      "WHERE p.id = ? AND p.user_id = ?", [id, userId]
    )
  },
  findById(id) {
    return db.getSingleResult(
      "SELECT * FROM playlists AS p WHERE p.id = ?", id
    )
  },
  findByUserId(requestedUserId) {
    return db.getMultipleResult(
      "SELECT " +
      "p.id, " +
      "p.name, " +
      "p.visibility, " +
      "p.user_id, " +
      "MIN(v.image) AS image, " +
      "COUNT(v.id) AS video_count, " +
      "SUM(v.play_count) AS video_views_count, " +
      "SUM(v.likes_count) AS video_likes_count, " +
      "SUM(v.dislikes_count) as video_dislikes_count  " +
      "FROM playlists AS p " +
      "JOIN users AS u " +
      "ON u.id = p.user_id " +
      "LEFT JOIN videos_playlists AS vp " +
      "ON vp.playlist_id = p.id " +
      "LEFT JOIN videos AS v " +
      "on vp.video_id = v.id " +
      "WHERE p.user_id = ? AND p.visibility = 'public' " +
      "GROUP BY p.id, p.name, p.user_id, p.visibility",
      requestedUserId
    )
  },
  deletePlaylist(id, userId){
    return db.deleteObj(
      "DELETE FROM playlists WHERE id = ? AND  user_id = ?", [id, userId]
    )
  },
  findAllOwnPlaylists(requestedUserId) {
    return db.getMultipleResult(
      "SELECT " +
      "p.id, " +
      "p.name, " +
      "p.visibility, " +
      "p.user_id, " +
      "MIN(v.image) AS image, " +
      "COUNT(v.id) AS video_count, " +
      "SUM(v.play_count) AS video_views_count, " +
      "SUM(v.likes_count) AS video_likes_count, " +
      "SUM(v.dislikes_count) as video_dislikes_count  " +
      "FROM playlists AS p " +
      "JOIN users AS u " +
      "ON u.id = p.user_id " +
      "LEFT JOIN videos_playlists AS vp " +
      "ON vp.playlist_id = p.id " +
      "LEFT JOIN videos AS v " +
      "on vp.video_id = v.id " +
      "WHERE p.user_id = ? " +
      "GROUP BY p.id, p.name, p.user_id, p.visibility ",
      requestedUserId
    )
  }
};


module.exports = query;
