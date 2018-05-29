// eslint-disable-next-line
(function() {
  const controllerName = 'preStream';
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${controllerName} started`);
    const vm = this;
    authService.auth().then(() => {
      vm.user = authService.authObj();
      if (!vm.user.auth) {
        // eslint-disable-next-line
        $window.location.href = '#/';
      }
    });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
