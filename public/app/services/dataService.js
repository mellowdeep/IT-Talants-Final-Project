angular.module('app').factory('dataService', function($http) {
  return {
    getVideo,
    aboutAuthor,
  };

  function aboutAuthor(userId) {
    return $http.get(`/user/${userId}`).then(res => res.data);
  }
  function getVideo(uuid) {
    return $http.get(`/video/${uuid}`).then(res => res.data);
  }
});
