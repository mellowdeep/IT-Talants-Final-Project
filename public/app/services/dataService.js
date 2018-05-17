angular.module('app').factory('dataService', function($http) {
  return {
    getVideo,
  };

  function getVideo(uuid) {
    return $http.get(`/${uuid}`).then(res => res.data);
  }
});
