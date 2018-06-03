// eslint-disable-next-line
(function() {
  const moduleName = 'playlistVideo';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = {
    watchVideo: '=',
    user: '=',
    playlistVideos: '=',
    currentVideoPlalist: '=',
    playlistData: '=',
  };
  const injection = ['dataService', '$window', 'linkService', 'helperService'];
  function controller(dataService, $window, linkService, helperService) {
    helperService.log(`${moduleName} started`);
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
          this.recommendedVideos = res.data.filter(
            x => x.id !== this.watchVideo.id,
          );

          this.watchVideo.autoplay = true;

          Object.defineProperty(this.watchVideo, 'endplay', {
            get() {
              return false;
            },
            set(v) {
              if (
                v &&
                vm.currentVideoPlalist.num + 1 < vm.playlistVideos.length &&
                vm.watchVideo.autoplay
              ) {
                linkService.redirect(
                  vm.playlistVideos[vm.currentVideoPlalist.num + 1]
                    .linkInPlaylist,
                );
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
