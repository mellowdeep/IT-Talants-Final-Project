// eslint-disable-next-line
(function() {
  const moduleName = 'videoPlayer';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', type: '=', user: '=' };
  const injection = ['$element', '$window', 'dataService'];
  function controller($element, $window, dataService) {
    console.log(`${moduleName} started`);
    this.like = false;
    this.dislike = false;
    this.canLike = true;

    this.setLike = type => {
      window.testVideo = this.watchVideo;
      dataService
        .setVideoLike({
          uuid: this.watchVideo.uuid,
          type,
          likeSign: this.watchVideo.likeSign || 0,
          dislikeSign: this.watchVideo.dislikeSign || 0,
        })
        .then(res => {
          if (res.status === 200) {
            return dataService.getVideo(this.watchVideo.uuid);
          }
          this.canLike = true;
          throw new Error('cannot set like');
        })
        .then(({ likeSign, dislikeSign, likesCount, dislikesCount }) => {
          this.watchVideo.likeSign = likeSign;
          this.watchVideo.dislikeSign = dislikeSign;
          this.watchVideo.likesCount = likesCount;
          this.watchVideo.dislikesCount = dislikesCount;
          this.canLike = true;
        })
        .catch(err => {
          console.log(err);
        });
    };

    this.currentStateResolution = 'SD';

    const updatePage = async () => {
      console.log('update');
      await this.watchVideo.promiseDataReady;

      this.video.attributes.poster.value = this.watchVideo.image;
      if (this.currentStateResolution === 'HD' && this.watchVideo.high_quality)
        this.source.attributes.src.value = this.watchVideo.highQuality;
      else this.source.attributes.src.value = this.watchVideo.lowQuality;

      this.video.load();
    };

    this.changeResolution = resolution => {
      this.currentStateResolution = resolution;
      this.video.pause();
      updatePage();
      this.video.load();
      this.video.play();
    };

    this.playPause = () => {
      console.log(this.video.muted);
      if (this.video) {
        if (this.video.paused) {
          this.video.play();
        } else {
          this.video.pause();
        }
      }
    };

    this.$postLink = () => {
      // eslint-disable-next-line
      this.source = $element.find('source')[0];
      // eslint-disable-next-line
      this.video = $element.find('video')[0];

      this.video.addEventListener('ended', () => {
        this.watchVideo.endplay = true;
        // if (this.watchVideo.autoplay) {
        //   $window.location.href = `#/video?uuid=${this.uuidnext}`;
        // }
      });

      // const watchVideo = obj.currentValue;
      // console.log('data', watchVideo);
      updatePage();
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
