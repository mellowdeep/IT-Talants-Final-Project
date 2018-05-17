// eslint-disable-next-line
(function() {
  const controllerName = 'preVideo';
  // --------------------------------------------------

  const injection = ['authService', 'dataService', '$window', '$location'];
  function controller(authService, dataService, $window, $location) {
    console.log(`${controllerName} started`);
    const vm = this;
    let ok;
    vm.watchVideo = {};
    vm.watchVideo.promiseDataReady = new Promise(res => (ok = res));
    console.log(vm.watchVideo);

    const check = async () => {
      const search = $location.search();
      // http://localhost:3000/#/video?uuid=DtxGPq0e

      if (!search.uuid) {
        $window.location.href = '#/';
        return;
      }
      const watchVideo = await dataService.getVideo(search.uuid);
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
