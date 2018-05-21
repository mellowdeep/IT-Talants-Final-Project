angular.module('app').factory('dataService', [
  '$http',
  'Upload',
  // --------API-----------
  function($http, Upload) {
    return {
      getVideo,
      aboutAuthor,
      uploadVideo,
      uploadContinueVideo,
      getInitData,
    };
    // -------------------
    function aboutAuthor(userId) {
      return $http.get(`/user/${userId}`).then(res => res.data);
    }

    function getVideo(uuid) {
      return $http.get(`/video/${uuid}`).then(res => res.data);
    }

    function getInitData() {
      window.$http = $http;
      return $http.get(`/main`);
    }

    function uploadVideo(data) {
      return Upload.upload({
        url: '/upload',
        method: 'POST',
        data,
      });
    }

    function uploadContinueVideo(data) {
      return Upload.upload({
        url: '/upload/continue',
        method: 'POST',
        data,
      });
    }

    // -------------------
  },
]);
