angular.module('app').factory('dataService', [
  '$http',
  'Upload',
  'linkService',
  '$q',
  // --------API-----------
  function($http, Upload, linkService, $q) {
    // const crpl = () => ({
    //   name: 'Test',
    //   userId: 2,
    //   videoCount: 14,
    //   playlistId: 1,
    //   videoViewsCount: 40,
    //   videoLikesCount: 40,
    //   videoDislikesCount: 40,
    //   visibility: 'public',
    //   image: '/upload/thumbnails/SquyWl8h.png',
    // });

    // const playlistsArray = [crpl(), crpl()];

    return {
      getVideo,
      aboutAuthor,
      uploadVideo,
      uploadContinueVideo,
      getInitData,
      addComment,
      getCommentsToVideo,
      setCommentLike,
      searchVideoByTag,
      search,
      setVideoLike,
      userVideos,
      subscribe,
      unsubscribe,
      addPlaylist,
      removePlaylist,
      getPlaylists,
      addVideoToPlaylist,
      getVideosFromPlaylist,
    };
    // -------------------

    function getVideosFromPlaylist(playlistId) {
      const url = `/playlist/${playlistId}/videos`;
      return (
        $http
          .get(url)
          // return search('Bonobo')
          .then(res => {
            res.data = res.data.map((video, id) => {
              video.playlistVideoId = id + 1;
              const { uuid } = video;
              video.linkInPlaylist = linkService.makeVideoLinkInPlaylist({
                playlistId,
                uuid,
              });
              return video;
            });
            return res;
          })
      );
    }

    function addVideoToPlaylist({ playlistId, uuid }) {
      const url = `/playlist/${playlistId}/${uuid}`;
      return $http.put(url);
    }

    function addPlaylist(name) {
      const url = `/create/playlist`;
      return $http.post(url, { name });
      // playlistsArray.push({
      //   name,
      //   userId: 2,
      //   videoCount: 14,
      //   playlistId: 1,
      //   videoViewsCount: 40,
      //   videoLikesCount: 40,
      //   videoDislikesCount: 40,
      //   visibility: 'public',
      //   image: '/upload/thumbnails/SquyWl8h.png',
      // });
      // return $q.resolve({ data: 1 });
    }

    function removePlaylist(playlistId) {
      const url = `/delete/playlist/${playlistId}`;
      return $http.delete(url);

      // const idx = playlistsArray.findIndex(x => x.playlistId === playlistId);
      // playlistsArray.splice(idx, 1);

      // return $q.resolve();
    }

    function getPlaylists(userId) {
      const url = `/playlists-user/${userId}`;
      // return new $q(res => res({ data: playlistsArray }))

      return $http.get(url).then(res => {
        res.data = res.data.map(item => {
          item.playlistId = item.id;
          item.userId = item.userId || item.user_id;
          item.videoCount = item.videoCount || item.video_count;
          item.videoViewsCount = item.videoViewsCount || item.video_views_count;
          item.videoLikesCount = item.videoLikesCount || item.video_likes_count;
          item.videoDislikesCount =
            item.videoDislikesCount || item.video_dislikes_count;

          item.link = linkService.makePlaylistLink({
            playlistId: item.playlistId,
          });
          const sum = item.videoLikesCount + item.videoDislikesCount;
          if (sum) item.percent = Math.floor(item.videoLikesCount * 100 / sum);
          else item.percent = 0;
          return item;
        });

        return res;
      });
    }

    function subscribe(userId) {
      const url = `/subscribe/add/${userId}`;
      return $http.put(url);
    }

    function unsubscribe(userId) {
      const url = `/subscribe/remove/${userId}`;
      return $http.put(url);
    }

    function searchVideoByTag(tag) {
      const url = `/api/search`;
      return $http.post(url, { type: 'tag', query: tag }).then(res => {
        if (Array.isArray(res.data)) {
          res.data = res.data.map(x => {
            x.percent = Math.round(
              100 * (x.likesCount || 0) / (x.likesCount + x.dislikesCount || 1),
            );
            x.linkToVideo = linkService.makeVideoLink(x.uuid);
            return x;
          });
        }
        return res;
      });
    }

    function search(searchText) {
      const url = `/api/search`;
      return $http.post(url, { type: 'query', query: searchText }).then(res => {
        if (Array.isArray(res.data)) {
          res.data = res.data.map(x => {
            x.percent = Math.round(
              100 * (x.likesCount || 0) / (x.likesCount + x.dislikesCount || 1),
            );
            x.linkToVideo = linkService.makeVideoLink(x.uuid);
            return x;
          });
        }
        return res;
      });
    }

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

        if (!Reflect.has(res.data, 'isSubscribed')) {
          res.data.isSubscribed = res.data.subscribe;
        }

        const sum = res.data.likes + res.data.dislikes;
        if (sum) res.data.percent = Math.floor(res.data.likes * 100 / sum);
        else res.data.percent = 0;

        return res.data;
      });
    }

    function userVideos(userId) {
      const url = `/user/${userId}/videos`;
      return $http.get(url);
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

        // res.data.likeSign = 1;
        res.data.percent = Math.round(
          100 *
            (res.data.likesCount || 0) /
            (res.data.likesCount + res.data.dislikesCount || 1),
        );
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

    function getCommentsToVideo(uuid, sortType) {
      // array of
      // "id": 4,
      // "text": "asdfasdf",
      // "likesCount": 0,
      // "dislikesCount": 0,
      // "postDate": "2018-5-22",
      // "likeSign": null

      const getDataPromise = $http.get(`/${uuid}/comments`).then(res => {
        if (Array.isArray(res.data)) {
          res.data = res.data.map(x => ({
            ...x,
            linkToUser: linkService.makeChannelLink(x.userId),
          }));
        }
        return res;
      });

      if (sortType === 'id')
        return getDataPromise.then(({ status, data }) => {
          if (Array.isArray(data)) data.sort((a, b) => b.id - a.id);
          return { status, data };
        });

      if (sortType === 'likes')
        return getDataPromise.then(({ status, data }) => {
          if (Array.isArray(data))
            data.sort(
              (a, b) =>
                b.likesCount -
                b.dislikesCount -
                (a.likesCount - a.dislikesCount),
            );
          return { status, data };
        });

      return getDataPromise;
    }

    function setCommentLike({ commentId, uuid, type, likeSign, dislikeSign }) {
      if (type === -1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/dislike/true`);
      }
      if (type === -1 && likeSign === 0 && dislikeSign === 1) {
        return $http.put(`/${uuid}/${commentId}/dislike/false`);
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 0) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/true`));
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/false`));
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/like/true`);
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/dislike/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/like/true`));
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 0) {
        return $http.put(`/${uuid}/${commentId}/like/false`);
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/${commentId}/like/false`)
          .then(() => $http.put(`/${uuid}/${commentId}/dislike/false`));
      }

      throw new Error('bad notation');
    }

    function setVideoLike({ uuid, type, likeSign, dislikeSign }) {
      console.log(uuid, type, likeSign, dislikeSign);
      if (type === -1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/dislike/true`);
      }
      if (type === -1 && likeSign === 0 && dislikeSign === 1) {
        return $http.put(`/${uuid}/dislike/false`);
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 0) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/true`));
      }
      if (type === -1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/false`));
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 0) {
        return $http.put(`/${uuid}/like/true`);
      }
      if (type === 1 && likeSign === 0 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/dislike/false`)
          .then(() => $http.put(`/${uuid}/like/true`));
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 0) {
        return $http.put(`/${uuid}/like/false`);
      }
      if (type === 1 && likeSign === 1 && dislikeSign === 1) {
        return $http
          .put(`/${uuid}/like/false`)
          .then(() => $http.put(`/${uuid}/dislike/false`));
      }

      throw new Error('bad notation');
    }
    // -------------------
  },
]);
