// eslint-disable-next-line
(function() {
  const controllerName = 'preVideo';
  // --------------------------------------------------

  const injection = [
    'authService',
    'dataService',
    '$window',
    '$location',
    '$q',
    'linkService',
    'helperService',
  ];
  function controller(
    authService,
    dataService,
    $window,
    $location,
    $q,
    linkService,
    helperService,
  ) {
    helperService.log(`${controllerName} started`);
    const vm = this;
    let ok;
    vm.watchVideo = {};

    vm.watchVideo.promiseDataReady = new $q(res => {
      ok = res;
    });

    const check = async () => {
      const search = $location.search();
      // http://localhost:3000/#/video?uuid=DtxGPq0e

      if (!search.uuid) {
        linkService.redirect(linkService.homeLink());
        return;
      }
      let watchVideo;
      try {
        watchVideo = await dataService.getVideo(search.uuid);
      } catch (e) {
        if (e.status === 404) {
          linkService.redirect(linkService.homeLink());

          return;
        }
        throw e;
      }
      Object.assign(vm.watchVideo, watchVideo);
      if (!vm.watchVideo) {
        // eslint-disable-next-line
        $window.location.href = '#/404';
        return;
      }
      ok();
      vm.user = await authService.isLogin();
    };

    check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
