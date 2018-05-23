angular.module('app').factory('linkService', [
  '$window',
  // --------API-----------
  function($window) {
    return {
      makeVideoLink,
      redirect,
    };

    function makeVideoLink(uuid) {
      return `#/video?uuid=${uuid}`;
    }

    function redirect(link) {
      $window.location.href = link;
    }
  },
]);
