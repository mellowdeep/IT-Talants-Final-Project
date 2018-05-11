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
    return db.getSingleResult(id)(
      "SELECT * FROM playlists AS p WHERE p.id = ?", id
    )
  },
  findByUserId(userId) {
    return db.getMultipleResult(userId)(
      "SELECT * FROM playlists AS p WHERE p.userId = ? AND p.visibility = public", userId
    )
  },
  deletePlaylist(id, userId){
    return db.deleteObj(
      "DELETE FROM playlists WHERE id = ? AND  user_id = ?", [id, userId]
    )
  },
  findAllOwnPlaylists(userId) {
    return db.getMultipleResult(
      "SELECT * FROM playlists AS p WHERE p.id = ?", userId
    )
  }

};


module.exports = query;
