angular.module('app').factory('linkService', [
  '$window',
  // --------API-----------
  function($window) {
    return {
      makeVideoLink,
      redirect,
      makeChannelLink,
      makeVideoLinkInPlaylist,
      makePlaylistLink,
    };

    function makeVideoLink(uuid) {
      return `#/video?uuid=${uuid}`;
    }

    function makeVideoLinkInPlaylist({ playlistId, uuid }) {
      return `#/playlist?id=${playlistId}&uuid=${uuid}`;
    }

    function makePlaylistLink({ playlistId }) {
      return `#/playlist?id=${playlistId}`;
    }

    function makeChannelLink(userId) {
      return `#/channel?userId=${userId}`;
    }

    function redirect(link) {
      $window.location.href = link;
    }
  },
]);
