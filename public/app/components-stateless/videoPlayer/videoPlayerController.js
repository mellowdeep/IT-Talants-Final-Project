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
  const injection = ['$element'];
  function controller($element) {
    console.log(`${moduleName} started`);
    this.like = false;
    this.dislike = false;

    this.setLike = () => {
      console.log('like');
    };

    this.setDislike = () => {
      console.log('dislike');
    };

    this.currentStateResolution = 'SD';

    const updatePage = async () => {
      console.log('update');
      await this.watchVideo.promiseDataReady;

      this.video.attributes.poster.value = this.watchVideo.image;
      if (this.currentStateResolution === 'HD' && this.watchVideo.high_quality)
        this.source.attributes.src.value = this.watchVideo.highQuality;
      else this.source.attributes.src.value = this.watchVideo.lowQuality;
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
