// eslint-disable-next-line
(function() {
  const moduleName = 'logoMenu';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { search: '<', user: '<' };
  const injection = ['authService', '$document', '$scope', '$window'];
  function controller(authService, $document, $scope, $window) {
    this.$onInit = () => {
      // this.search ready
    };

    const handlerFunctions = [];
    this.dropDownUser = false;
    // this.user = { auth: false };

    // authService.auth().then(res => {
    //   this.user = res;
    // });

    this.upload = () => {
      console.log('test');
      if (this.user.auth) $window.location.href = '#/upload';
      else $window.location.href = '#/login';
    };

    this.buttonLogin = () => {
      this.dropDownUser = !this.dropDownUser;
    };

    this.logout = () => {
      authService.logout().then(() => {
        this.dropDownUser = false;
      });
    };

    this.$postLink = () => {
      const fn = e => {
        if (e.path.every(p => p.id !== 'logo-menu-drop-down-logout')) {
          $scope.$apply(() => {
            this.dropDownUser = false;
          });

          // $scope.$digest();
        }
      };
      const event = 'click';
      handlerFunctions.push({ event, fn });

      $document.on(event, fn);
    };

    this.$onDestroy = () => {
      handlerFunctions.forEach(({ event, fn }) => $document.on(event, fn));
      console.log('destroy');
    };

    console.log(`${moduleName} started`);
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
