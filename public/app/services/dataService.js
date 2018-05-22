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
      getCommentsToVideo,
      setCommentLike,
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
          'userId',
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

    function getCommentsToVideo(uuid) {
      // array of
      // "id": 4,
      // "text": "asdfasdf",
      // "likesCount": 0,
      // "dislikesCount": 0,
      // "postDate": "2018-5-22",
      // "likeSign": null
      return $http.get(`/${uuid}/comments`);
    }

    function setCommentLike({ commentId, uuid, type }) {
      if (type === 0) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/false`));
      }
      if (type === -1) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/true`));
      }
      if (type === 1) {
        return $http
          .put(`/${uuid}/${commentId}/dislike/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/like/true`));
      }
      return new Error('bad notation');
    }
    // -------------------
  },
]);
