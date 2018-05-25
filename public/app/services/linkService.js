angular.module('app').factory('linkService', [
  '$window',
  // --------API-----------
  function($window) {
    return {
      makeVideoLink,
      redirect,
      makeChannelLink,
      makeVideoPlaylistLink,
    };

    function makeVideoLink(uuid) {
      return `#/video?uuid=${uuid}`;
    }

    function makeVideoPlaylistLink({ playlistId, numvideoid }) {
      return `#/video?playlistid=${playlistId}&numvideoid=${numvideoid || 0}`;
    }

    function makeChannelLink(userId) {
      return `#/channel?userId=${userId}`;
    }

    function redirect(link) {
      $window.location.href = link;
    }
  },
]);
