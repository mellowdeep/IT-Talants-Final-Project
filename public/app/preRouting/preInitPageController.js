// eslint-disable-next-line
(function() {
  const controllerName = 'preInitPage';
  // --------------------------------------------------

  const injection = ['authService'];
  function controller(authService) {
    console.log(`${controllerName} started`);

    authService.isLogin();
    // console.log(status, $window);
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
  // eslint-disable-next-line
})();
