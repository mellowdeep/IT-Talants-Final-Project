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
  ];
  function controller(authService, dataService, $window, $location, $q) {
    console.log(`${controllerName} started`);
    const vm = this;
    let ok;
    vm.watchVideo = {};

    vm.watchVideo.promiseDataReady = new $q(res => (ok = res));
    console.log(vm.watchVideo);

    const check = async () => {
      const search = $location.search();
      // http://localhost:3000/#/video?uuid=DtxGPq0e

      if (!search.uuid) {
        // eslint-disable-next-line
        $window.location.href = '#/';
        return;
      }
      let watchVideo;
      try {
        watchVideo = await dataService.getVideo(search.uuid);
        // watchVideo.aboutAuthor = await
      } catch (e) {
        if (e.status === 404) {
          console.log('not found video');
          $window.location.href = '#/404';
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
      console.log('data video', vm.watchVideo);
      ok();
      vm.user = await authService.isLogin();
    };

    check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
