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
      addComment,
    };
    // -------------------

    function checkFields(url, resData, fields) {
      fields.forEach(field => {
        if (!Reflect.has(resData, field))
          throw new Error(`No field "${field}" in response "${url}"`);
      });
    }

    function aboutAuthor(userId) {
      const url = `/user/${userId}`;
      return $http.get(url).then(res => {
        checkFields(url, res.data, [
          'id',
          'name',
          'views',
          'videos',
          'likes',
          'dislikes',
        ]);

        return res.data;
      });
    }

    function getVideo(uuid) {
      const url = `/video/${uuid}`;
      return $http.get(url).then(res => {
        checkFields(url, res.data, [
          'id',
          'user_id',
          'name',
          'about',
          'tag',
          'playCount',
          'likeSign',
          'dislikeSign',
          'likesCount',
          'dislikesCount',
          'highQuality',
          'lowQuality',
          'image',
          'duration',
          'uuid',
        ]);

        return res.data;
      });
    }

    function getInitData() {
      // window.$http = $http;
      const url = `/main`;
      return $http.get(url).then(res => {
        // checkFields(url, res.data, [
        //   'user_id',
        //   'name',
        //   'about',
        //   'tag',
        //   'playCount',
        //   'likeSign',
        //   'dislikeSign',
        //   'likesCount',
        //   'dislikesCount',
        //   'highQuality',
        //   'lowQuality',
        //   'image',
        //   'duration',
        //   'uuid',
        // ]);

        return res;
      });
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

    function addComment({ uuid, text }) {
      // console.log
      return $http.put(`/${uuid}/add-comment`, { text });
    }

    // -------------------
  },
]);
