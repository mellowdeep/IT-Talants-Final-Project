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
    '$q',
  ];
  function controller(
    authService,
    dataService,
    linkService,
    $window,
    $location,
    $q,
  ) {
    console.log(`${controllerName} started`);
    const vm = this;

    vm.search = $location.search().query || '';
    if (vm.search) {
      console.log(`searching for ${this.search}`);
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
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.playlists = res.data;
        }
        return dataService.search(vm.search);
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.searchData = res.data;
          console.log(vm.searchData);
        }
        return res;
      })
      .catch(err => {
        console.log(err);
        linkService.redirect('#/404');
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
