// eslint-disable-next-line
(function() {
  const moduleName = 'videoPlayer';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', type: '=', user: '=' };
  const injection = ['$element', '$window', 'dataService', 'helperService'];
  function controller($element, $window, dataService, helperService) {
    helperService.log(`${moduleName} started`);
    this.likeButtonDisable = false;

    this.setLike = type => {
      this.likeButtonDisable = true;
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
          this.likeButtonDisable = false;
          throw new Error('cannot set like');
        })
        .then(({ likeSign, dislikeSign, likesCount, dislikesCount }) => {
          this.watchVideo.likeSign = likeSign;
          this.watchVideo.dislikeSign = dislikeSign;
          this.watchVideo.likesCount = likesCount;
          this.watchVideo.dislikesCount = dislikesCount;
          this.likeButtonDisable = false;
        })
        .catch(err => {
          helperService.log(err);
        });
    };

    this.currentStateResolution = 'SD';

    const updatePage = async () => {
      await this.watchVideo.promiseDataReady;

      this.video.attributes.poster.value = this.watchVideo.image;
      if (this.currentStateResolution === 'HD' && this.watchVideo.high_quality)
        this.source.attributes.src.value = this.watchVideo.highQuality;
      else this.source.attributes.src.value = this.watchVideo.lowQuality;

      return this.video.load();
    };

    this.changeResolution = resolution => {
      this.currentStateResolution = resolution;
      if (this.video.paused) this.video.pause();
      updatePage().then(() => this.video.play());
    };

    this.playPause = () => {
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
      });

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
