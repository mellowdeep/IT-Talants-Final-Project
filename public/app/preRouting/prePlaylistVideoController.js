// eslint-disable-next-line
(function() {
  const controllerName = 'prePlaylistVideo';
  // --------------------------------------------------

  const injection = [
    'authService',
    'dataService',
    '$window',
    '$location',
    '$q',
    'helperService',
  ];
  function controller(
    authService,
    dataService,
    $window,
    $location,
    $q,
    helperService,
  ) {
    helperService.log(`${controllerName} started`);
    const vm = this;
    let ok;
    vm.watchVideo = {};
    vm.playlistVideos = [];
    vm.user = { auth: false, id: -1 };
    vm.playlistData = {};
    vm.currentVideoPlalist = { id: null, uuid: null, num: null };
    // eslint-disable-next-line
    vm.watchVideo.promiseDataReady = new $q(res => (ok = res));

    const search = $location.search();
    // http://localhost:3000/#/playlist?id=3&num=4

    // eslint-disable-next-line
    let { id, num } = search;
    num = Number(num);
    let uuid;
    if (!id) {
      // eslint-disable-next-line
      // $window.location.href = '#/';
      return;
    }

    dataService
      .getVideosFromPlaylist(id)
      .then(res => {
        if (!res.data.length) throw Error('array without elements');
        vm.playlistVideos = res.data;

        if (
          num < 0 ||
          num >= vm.playlistVideos.length ||
          num === null ||
          num === undefined ||
          Number.isNaN(Number(num))
        )
          num = 0;

        // eslint-disable-next-line prefer-destructuring
        uuid = vm.playlistVideos[num].uuid;

        vm.currentVideoPlalist.id = id;
        vm.currentVideoPlalist.uuid = uuid;
        vm.currentVideoPlalist.num = num;
        return dataService.getVideo(uuid);
      })
      .then(watchVideo => {
        ok();
        Object.assign(vm.watchVideo, watchVideo);
        return authService.isLogin();
      })
      .then(user => {
        vm.user = user;
        return dataService.getPlaylistData(id);
      })
      .then(({ data }) => {
        Object.assign(vm.playlistData, data);
      })
      .catch(err => {
        helperService.log(err);
        // $window.location.href = '#/404';
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
