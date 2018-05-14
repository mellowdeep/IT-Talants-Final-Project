// eslint-disable-next-line
(function() {
  const controllerName = 'preSignUp';
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${controllerName} started`);

    authService.isLogin().then(res => {
      console.log(res);
      if (res.auth !== false) {
        $window.location.href = '#/';
      }
    });
    // console.log(status, $window);
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
  // eslint-disable-next-line
})();
