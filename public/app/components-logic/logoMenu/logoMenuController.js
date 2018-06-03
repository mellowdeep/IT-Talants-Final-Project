// eslint-disable-next-line
(function() {
  const moduleName = 'logoMenu';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = { search: '<' };
  const injection = [
    'authService',
    '$document',
    '$scope',
    '$window',
    'linkService',
    '$route',
    'helperService',
  ];
  function controller(
    authService,
    $document,
    $scope,
    $window,
    linkService,
    $route,
    helperService,
  ) {
    helperService.log(`${moduleName} started`);

    const handlerFunctions = [];
    this.dropDownUser = false;

    this.clickOnLogin = () => {
      this.dropDownUser = false;
    };

    this.upload = () => {
      if (this.user.auth) {
        // eslint-disable-next-line no-param-reassign
        $window.location.href = '#/upload';
      } else {
        // eslint-disable-next-line no-param-reassign
        $window.location.href = '#/login';
      }
    };

    this.buttonLogin = () => {
      this.dropDownUser = !this.dropDownUser;
    };

    this.logout = () => {
      this.dropDownUser = false;

      swal({
        title: 'Do you want to logout?',
        icon: 'warning',
        buttons: { cancel: 'cancel', logout: 'logout' },
      }).then(value => {
        if (value === 'logout')
          authService.logout().then(() => {
            $route.reload();
          });
      });
    };

    this.$postLink = () => {
      this.user = authService.authObj();
      const fn = e => {
        if (e.path.every(p => p.id !== 'logo-menu-drop-down-logout')) {
          $scope.$apply(() => {
            this.dropDownUser = false;
          });
        }
      };
      const event = 'click';
      handlerFunctions.push({ event, fn });
      $document.on(event, fn);
    };

    this.$onDestroy = () => {
      handlerFunctions.forEach(({ event, fn }) => $document.on(event, fn));
      helperService.log('destroy');
    };
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    bindings,
    controller: [...injection, controller],
  });
  // END module
})();
