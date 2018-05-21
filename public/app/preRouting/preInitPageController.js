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

    authService
      .isLogin()
      .then(res => {
        vm.user = res;
      })
      .then(() => dataService.getInitData())
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
