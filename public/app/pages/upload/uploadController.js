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
  const injection = ['authService', '$window', '$scope'];
  function controller(authService, $window, $scope) {
    console.log(`${moduleName} started`);

    this.$onChanges = changesObj => {
      console.log(changesObj);
    };

    const loginWatcher = user => {
      if (user.auth === false) $window.location.href = '#/';
    };

    this.$onInit = () => {
      authService.digest(loginWatcher);
      // $scope.user = this.user;
    };

    this.$onDestroy = () => {
      authService.removeDigest(loginWatcher);
    };

    // setInterval(() => console.log(this.user), 1000);
    // $scope.$watch(
    //   'user',
    //   function(newValue) {
    //     // eslint-disable-next-line
    //     if (newValue.auth === false) $window.location.href = '#/';
    //   },
    //   true,
    // );

    // this.$onChanges = user => {
    //   console.log(user);
    //   if (user.currentValue && !user.currentValue.auth) {
    //     console.log('change location');
    //   }
    // };
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
