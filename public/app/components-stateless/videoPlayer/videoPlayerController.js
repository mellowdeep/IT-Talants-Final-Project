// eslint-disable-next-line
(function() {
  const moduleName = 'videoPlayer';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', type: '=' };
  const injection = ['$element'];
  function controller($element) {
    console.log(`${moduleName} started`);

    this.currentStateResolution = 'SD';
    this.changeResolution = resolution => {
      this.currentStateResolution = resolution;
      this.video.pause();
      updatePage();
      this.video.load();
      this.video.play();
    };

    this.playPause = () => {
      console.log(this);
      if (this.video) {
        if (this.video.paused) {
          this.video.play();
        } else {
          this.video.pause();
        }
      }
    };

    const updatePage = async () => {
      console.log('update');
      await this.watchVideo.promiseDataReady;
      // console.log('after promise');

      // console.log(source.attributes);
      this.video.attributes.poster.value = `/upload/thumbnails/${
        this.watchVideo.image
      }`;
      if (this.currentStateResolution === 'HD')
        this.source.attributes.src.value = `/upload/high/${
          this.watchVideo.video
        }`;
      else
        this.source.attributes.src.value = `/upload/low/${
          this.watchVideo.video
        }`;
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
