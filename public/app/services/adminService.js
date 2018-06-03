angular.module('app').factory('adminService', [
  '$http',
  'Upload',
  'linkService',
  // --------API-----------
  function($http, Upload, linkService) {
    return {
      getVideosToApprove,
      approveVideoId,
      blockVideoId,
    };
    // -------------------

    function approveVideoId(videoId) {
      const url = `/admin/approve/${videoId}`;
      return $http.put(url);
    }

    function blockVideoId(videoId) {
      const url = `/admin/block/${videoId}`;
      return $http.put(url);
    }

    function getVideosToApprove() {
      const url = `/admin/approve`;
      return (
        $http
          .get(url)
          // return search('Bonobo')
          .then(res => {
            res.data = res.data.map(videoItem => {
              const video = videoItem;
              video.userId = video.userId || video.user_id;
              video.playCount = video.playCount || video.play_count;
              video.likesCount = video.likesCount || video.likes_count;
              video.dislikesCount = video.dislikesCount || video.dislikes_count;
              video.postDate = video.postDate || video.post_date;
              video.lowQuality = video.lowQuality || video.low_quality;
              video.highQuality = video.highQuality || video.high_quality;

              video.approveVideo = '';

              video.linkToUser = linkService.makeChannelLink(video.userId);
              video.linkToVideo = linkService.makeVideoLink(video.uuid);

              video.percent = Math.round(
                100 *
                  (video.likesCount || 0) /
                  (video.likesCount + video.dislikesCount || 1),
              );

              return video;
            });
            return res;
          })
      );
    }
    // --------------------
  },
]);
