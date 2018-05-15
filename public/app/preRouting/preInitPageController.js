// eslint-disable-next-line
(function() {
  const controllerName = 'preInitPage';
  // --------------------------------------------------

  const injection = ['authService', '$scope'];
  function controller(authService, $scope) {
    const vm = this;
    console.log(`${controllerName} started`);

    vm.user = { auth: false };
    const check = async () => {
      const user = await authService.isLogin();

      $scope.$apply(() => {
        vm.user = user;
      });
    };
    check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
  // eslint-disable-next-line
})();
