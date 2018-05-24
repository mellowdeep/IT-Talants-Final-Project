angular.module('app').factory('linkService', [
  '$window',
  // --------API-----------
  function($window) {
    return {
      makeVideoLink,
      redirect,
      makeChannelLink,
    };

    function makeVideoLink(uuid) {
      return `#/video?uuid=${uuid}`;
    }

    function makeChannelLink(userId) {
      return `#/channel?userId=${userId}`;
    }

    function redirect(link) {
      $window.location.href = link;
    }
  },
]);
