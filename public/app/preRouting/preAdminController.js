// eslint-disable-next-line
(function() {
  const controllerName = 'preAdmin';
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${controllerName} started`);

    const check = async () => {
      const user = await authService.isLogin();

      if (user.auth === false || user.role !== 'admin') {
        // eslint-disable-next-line
        $window.location.href = '#/';
      }
    };

    check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
