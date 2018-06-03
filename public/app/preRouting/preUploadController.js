// eslint-disable-next-line
(function() {
  const controllerName = 'preUpload';
  // --------------------------------------------------

  const injection = ['authService', '$window', 'linkService', 'helperService'];
  function controller(authService, $window, linkService, helperService) {
    helperService.log(`${controllerName} started`);
    const vm = this;
    authService.auth().then(() => {
      vm.user = authService.authObj();
      if (!vm.user.auth) {
        linkService.redirect(linkService.homeLink());
      }
    });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
