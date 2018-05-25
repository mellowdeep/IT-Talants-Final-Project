// eslint-disable-next-line
(function() {
  const controllerName = 'preInitPage';
  // --------------------------------------------------

  const injection = ['authService', 'dataService'];
  function controller(authService, dataService) {
    console.log(`${controllerName} started`);

    const vm = this;

    vm.user = { auth: false };
    vm.initData = {};
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
          vm.playlists = res.data;
        }
        return dataService.getInitData();
      })
      .then(res => {
        vm.initData = res.data;
        console.log(vm.initData);
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
  // eslint-disable-next-line
})();
