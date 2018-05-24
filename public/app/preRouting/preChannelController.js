// eslint-disable-next-line
(function() {
  const controllerName = 'preChannel';
  // --------------------------------------------------

  const injection = [
    'authService',
    'dataService',
    'linkService',
    '$window',
    '$location',
    '$q',
  ];
  function controller(
    authService,
    dataService,
    linkService,
    $window,
    $location,
    $q,
  ) {
    console.log(`${controllerName} started`);
    const vm = this;

    const search = $location.search();
    const { userId } = search;
    vm.aboutAuthor = {};

    if (!userId) {
      linkService.redirect('#/404');
    }

    vm.user = { auth: false };
    vm.initData = {};

    authService
      .isLogin()
      .then(res => {
        vm.user = res;
      })
      .then(() => dataService.aboutAuthor(userId))
      .then(res => {
        vm.aboutAuthor = res;
      })
      .catch(err => {
        console.log(err);
        linkService.redirect('#/404');
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
