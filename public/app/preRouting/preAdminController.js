// eslint-disable-next-line
(function() {
  const controllerName = 'preAdmin';
  // --------------------------------------------------

  const injection = [
    'authService',
    '$window',
    'adminService',
    'linkService',
    'helperService',
  ];
  function controller(
    authService,
    $window,
    adminService,
    linkService,
    helperService,
  ) {
    helperService.log(`${controllerName} started`);

    const vm = this;
    vm.user = { auth: false, id: -1 };
    vm.videosToApprove = [];

    authService
      .isLogin()
      .then(res => {
        vm.user = res;

        if (vm.user.auth === false || vm.user.role !== 'admin') {
          // eslint-disable-next-line
          throw new Error('no rights');
        }
        return adminService.getVideosToApprove();
      })
      .then(res => {
        if (res && Array.isArray(res.data)) {
          vm.videosToApprove.push(...res.data);
        }
      })
      .catch(err => {
        helperService.log(err);
        linkService.redirect(linkService.homeLink());
      });
  }

  // --------------------------------------------------
  // eslint-disable-next-line
  angular.module('app').controller(controllerName, [...injection, controller]);
})();
