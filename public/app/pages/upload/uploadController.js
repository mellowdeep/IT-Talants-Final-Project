// eslint-disable-next-line
(function() {
  const moduleName = 'upload';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '<' };
  const injection = [
    'authService',
    '$window',
    '$q',
    'helperService',
    'linkService',
  ];
  function controller(authService, $window, $q, helperService, linkService) {
    helperService.log(`${moduleName} started`);
    const vm = this;
    vm.SELECT_FILE = 'SELECT_FILE';
    vm.EDIT_FILE = 'EDIT_FILE';
    vm.pageStatus = vm.SELECT_FILE;

    let ok;
    vm.uploadFile = {
      get file() {
        return this._file;
      },
      set file(v) {
        this._file = v;
        vm.pageStatus = vm.EDIT_FILE;
        ok();
      },
      _file: null,
      // eslint-disable-next-line
      promise: new $q(res => (ok = res)),
    };

    const loginWatcher = user => {
      if (user.auth === false) linkService.redirect(linkService.loginLink());
    };

    vm.$onInit = () => {
      authService.digest(loginWatcher);
    };

    vm.$onDestroy = () => {
      authService.removeDigest(loginWatcher);
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
