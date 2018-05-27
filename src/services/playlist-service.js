const repository = require("../repositories/playlist-repository");

const mapPlaylist = playlist => ({
  id: playlist.id,
  userId: playlist.user_id,
  name: playlist.name,
  image: playlist.image,
  visibility: playlist.visibility,
  videoCount: playlist.video_count || 0,
  videoViewsCount: playlist.video_views_count || 0,
  videoLikesCount: playlist.video_likes_count || 0,
  videoDislikesCount: playlist.video_dislikes_count || 0,
});

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
  getRandomPlaylists: () =>
    repository.findRandomPlaylists()
      .then(playlists => {
        if(playlists) return playlists.map(p => mapPlaylist(p));
        return playlists;
      }),
  getOwnPlaylist: (id, userId) =>
    repository.findOwnPlaylist(id, userId)
      .then(playlist => {
        if (playlist) return playlist;
        throw new Error("Playlist not found");
      }),
    deletePlaylist:(id, userId) =>
    repository.deletePlaylist(id, userId)
      .then(rows => {
        if (rows) return rows;
        throw new Error("Unable to delete playlist");
      }),
  getPlaylists: (requestedUserId, isYou) =>
      isYou ?
    repository.findAllOwnPlaylists(requestedUserId) :
    repository.findByUserId(requestedUserId)
      .then(playlists => {
        if(Array.isArray(playlists)) return playlists.map(p => mapPlaylist(p));
        if (playlists) return mapPlaylist(playlists);
        throw new Error("Playlists not found");
      }),
};


module.exports = playlistFunction;
