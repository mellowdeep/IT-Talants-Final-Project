angular.module('app').factory('dataService', [
  '$http',
  'Upload',
  // --------API-----------
  function($http, Upload) {
    return {
      getVideo,
      aboutAuthor,
      uploadVideo,
    };
    // -------------------
    function aboutAuthor(userId) {
      return $http.get(`/user/${userId}`).then(res => res.data);
    }

    function getVideo(uuid) {
      return $http.get(`/video/${uuid}`).then(res => res.data);
    }

    function uploadVideo(data) {
      return Upload.upload({
        url: '/upload',
        method: 'POST',
        data,
      });
    }
    // -------------------
  },
]);
