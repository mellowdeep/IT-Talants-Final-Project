// eslint-disable-next-line
(function() {
  const controllerName = 'preChannel';
  // --------------------------------------------------

  const injection = [
    'authService',
    'dataService',
    'linkService',
    '$window',
    '$location',
    '$q',
    'helperService',
  ];
  function controller(
    authService,
    dataService,
    linkService,
    $window,
    $location,
    $q,
    helperService,
  ) {
    helperService.log(`${controllerName} started`);
    const vm = this;

    const search = $location.search();
    const { userId, tab } = search;
    let ok;
    // eslint-disable-next-line
    vm.aboutAuthor = { aboutAuthorPromise: new $q(res => (ok = res)) };

    if (!userId) {
      linkService.redirect('#/404');
      return;
    }

    vm.tab = tab || 'videos';
    vm.user = { auth: false };
    vm.initData = {};
    vm.playlists = [];

    authService
      .isLogin()
      .catch(() => {})
      .then(res => {
        vm.user = res;
        if (vm.user.auth) return dataService.getPlaylists(vm.user.id);
        return null;
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.playlists.push(...res.data);
        }
        return dataService.aboutAuthor(userId);
      })
      .then(res => {
        Object.assign(vm.aboutAuthor, res);
        ok();
      })
      .catch(err => {
        helperService.log(err);
        linkService.redirect('#/404');
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
