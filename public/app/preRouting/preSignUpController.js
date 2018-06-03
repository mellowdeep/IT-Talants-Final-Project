// eslint-disable-next-line
(function() {
  const controllerName = 'preSignUp';
  // --------------------------------------------------

  const injection = ['authService', '$window', 'helperService', 'linkService'];
  function controller(authService, $window, helperService, linkService) {
    helperService.log(`${controllerName} started`);

    const check = async () => {
      const user = await authService.isLogin();

      if (user.auth) {
        linkService.redirect(linkService.homeLink());
      }
    };

    check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
