// eslint-disable-next-line
(function() {
  const controllerName = 'preSearch';
  // --------------------------------------------------

  const injection = [
    'authService',
    'dataService',
    'linkService',
    '$window',
    '$location',
    // '$q',
    'helperService',
  ];
  function controller(
    authService,
    dataService,
    linkService,
    $window,
    $location,
    // $q,
    helperService,
  ) {
    helperService.log(`${controllerName} started`);
    const vm = this;

    vm.search = $location.search().query || '';
    if (vm.search) {
      helperService.log(`searching for ${vm.search}`);
    }
    // search="$ctrl.search"

    vm.user = { auth: false };
    vm.searchData = [];
    vm.playlists = [];

    authService
      .isLogin()
      .then(res => {
        vm.user = res;
        if (vm.user.auth) return dataService.getPlaylists(vm.user.id);
        return null;
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.playlists.push(...res.data);
        }
        return dataService.search(vm.search);
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.searchData = res.data;
        }
        return res;
      })
      .catch(err => {
        helperService.log(err);
        linkService.redirect(linkService.p404Link());
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
