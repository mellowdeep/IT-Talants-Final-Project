// eslint-disable-next-line
(function() {
  const moduleName = 'playlistVideo';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=', playlistVideos: '=' };
  const injection = ['dataService', '$window', 'linkService'];
  function controller(dataService, $window, linkService) {
    console.log(`${moduleName} started`);
    this.inputByUser = '';
    this.currentVideo = {};
    this.autoplay = true;
    const vm = this;

    this.autoplayChange = () => {
      this.watchVideo.autoplay = !this.watchVideo.autoplay;
    };

    this.$postLink = () => {
      this.watchVideo.promiseDataReady
        .then(() => dataService.searchVideoByTag(this.watchVideo.tag))
        .then(res => {
          if (res.status === 200) console.log(res.data);
          this.recommendedVideos = res.data.filter(
            x => x.id !== this.watchVideo.id,
          );

          this.watchVideo.autoplay = true;

          Object.defineProperty(this.watchVideo, 'endplay', {
            get() {
              return false;
            },
            set(v) {
              if (v && vm.recommendedVideos.length && vm.watchVideo.autoplay) {
                const url = linkService.makeVideoLink(
                  vm.recommendedVideos[0].uuid,
                );
                linkService.redirect(url);
              }
            },
          });
        });
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
  // eslint-disable-next-line
})();
