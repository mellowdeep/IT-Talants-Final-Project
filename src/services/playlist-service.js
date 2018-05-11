const repository = require("../repositories/playlist-repository");

const playlistFunction = {
  createPlaylist: (playlist) =>
    repository.savePlaylist(playlist)
      .then(id => id),
  getPlaylist: (id) =>
    repository.findById(id)
      .then(playlist => {
        if (playlist) return playlist;
        throw new Error("Playlist not found");
      }),
  getOwnPlaylist: (id, userId) =>
    repository.findOwnPlaylist(id, userId)
      .then(playlist => {
        if (playlist) return playlist;
        throw new Error("Playlist not found");
      }),
  getPublicPlaylistsByUser: (userId) =>
     repository.findByUserId(userId)
       .then(playlists => {
         if(playlists) return playlists;
         throw new Error("Playlist not found");
       }),
  deletePlaylist:(id, userId) =>
    repository.deletePlaylist(id, userId)
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to delete playlist");
      }),
  getOwnPlaylists: (userId) =>
    repository.findAllOwnPlaylists(userId)
      .then(playlists => {
        if (playlists) return playlists;
        throw new Error("Playlists not found");
      }),
};


module.exports = playlistFunction;
