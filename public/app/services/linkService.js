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
      makeSearchLink,
      homeLink,
      loginLink,
      p404Link,
    };

    function p404Link() {
      return `#/404`;
    }
    function makeVideoLink(uuid) {
      return `#/video?uuid=${uuid}`;
    }

    function homeLink() {
      return `#/`;
    }

    function loginLink() {
      return '#/login';
    }

    function makeVideoLinkInPlaylist({ playlistId, num }) {
      return `#/playlist?id=${playlistId}&num=${num}`;
    }

    function makePlaylistLink({ playlistId }) {
      return `#/playlist?id=${playlistId}`;
    }

    function makeChannelLink(userId) {
      return `#/channel?userId=${userId}`;
    }

    function makeSearchLink(search) {
      return `#/search?query=${search.trim()}`;
    }
    function redirect(link) {
      // eslint-disable-next-line no-param-reassign
      $window.location.href = link;
    }
  },
]);
