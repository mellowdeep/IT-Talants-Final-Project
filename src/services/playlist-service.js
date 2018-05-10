const repository = require("../repositories/playlist-repository");

const playlistFunction = {
  createPlaylist: (playlist) =>
    repository.savePlaylist(playlist)
      .then(id => id),
  getPlaylist: (id) =>
    repository.findById(id)
      .then(playlist => {
        if (playlist) return playlist.id;
        throw "Not found";
      }),
  getOwnPlaylist: (id, userId) =>
    repository.findOwnPlaylist(id, userId)
      .then(playlist => {
        if (playlist) return playlist.id;
        throw "Not found";
      }),
};


module.exports = playlistFunction;
