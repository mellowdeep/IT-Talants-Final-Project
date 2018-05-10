const db = require("../config/db");

const query = {
  savePlaylist(playlist) {
    return db.insertObj(
      "INSER INTO playlists(name, user_id, visibility) VALUES(?,?,?)", [
        playlist.name,
        playlist.userId,
        playlist.visibility
      ]
    )
  }
};


module.exports = query;
