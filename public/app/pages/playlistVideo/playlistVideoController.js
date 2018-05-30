// eslint-disable-next-line
(function() {
  const moduleName = 'playlistVideo';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = {
    watchVideo: '=',
    user: '=',
    playlistVideos: '=',
    currentVideoPlalist: '=',
    playlistData: '=',
  };
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

    // setTimeout(() => console.log(this.playlistData), 3000);

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
              if (
                v &&
                vm.currentVideoPlalist.num + 1 < vm.playlistVideos.length &&
                vm.watchVideo.autoplay
              ) {
                console.log(vm.playlistVideos, vm.currentVideoPlalist.num);
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
