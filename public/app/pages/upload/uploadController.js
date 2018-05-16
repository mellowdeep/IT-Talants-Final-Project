// eslint-disable-next-line
(function() {
  const moduleName = 'upload';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '<' };
  const injection = ['authService', '$window', 'Upload', '$http'];
  function controller(authService, $window, Upload, $http) {
    console.log(`${moduleName} started`);
    const vm = this;
    vm.SELECT_FILE = 'SELECT_FILE';
    vm.EDIT_FILE = 'EDIT_FILE';
    vm.pageStatus = vm.SELECT_FILE;
    vm.uploadFile = {
      get file() {
        return this._file;
      },
      set file(v) {
        console.log('watcher event', v);
        this._file = v;
        vm.pageStatus = vm.EDIT_FILE;
      },
      _file: null,
    };

    const loginWatcher = user => {
      // eslint-disable-next-line
      if (user.auth === false) $window.location.href = '#/';
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
