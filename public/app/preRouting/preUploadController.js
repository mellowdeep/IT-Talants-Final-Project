// eslint-disable-next-line
(function() {
  const controllerName = 'preUpload';
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${controllerName} started`);
    const vm = this;
    vm.user = authService.authObj();
    if (!vm.user.auth) {
      // eslint-disable-next-line
      $window.location.href = '#/';
    }

    this.$onChanges = changesObj => {
      console.log(changesObj);
      // if (user.currentValue && !user.currentValue.auth) {
      //   console.log('change location upper');
      //   // eslint-disable-next-line
      //   // $window.location.href = '#/';
      // }
    };

    // const check = async () => {
    //   vm.user = await authService.isLogin();

    // };

    // check();
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
