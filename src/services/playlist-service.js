const repository = require("../repositories/playlist-repository");
const status = require("../config/status-code");

const playlistFunction = {
  createPlaylist: (playlist) =>
    repository.savePlaylist(playlist)
      .then(id => id),
  getPlaylist: (id) =>
    repository.findById(id)
      .then(playlist => {
        if (playlist) return playlist;
        throw {message:'Playlist not found',
          statusCode: status.NOT_FOUND};
      }),
  getOwnPlaylist: (id, userId) =>
    repository.findOwnPlaylist(id, userId)
      .then(playlist => {
        if (playlist) return playlist;
        throw {message:'Playlist not found',
          statusCode: status.NOT_FOUND};
      }),
  getPublicPlaylistsByUser: (userId) =>
     repository.findByUserId(userId)
       .then(playlists => {
         if(playlists) return playlists;
         throw {message:'Playlist not found',
           statusCode: status.NOT_FOUND};
       }),
  deletePlaylist:(id, userId) =>
    repository.deletePlaylist(id, userId)
      .then(rows => {
        if (rows) return rows;
        throw {
          message: 'Cannot delete playlist',
          statusCode: status.INTERNAL_SERVER_ERROR
        };
      }),
};


module.exports = playlistFunction;
