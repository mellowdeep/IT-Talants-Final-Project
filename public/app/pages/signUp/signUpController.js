// eslint-disable-next-line
(function() {
  const moduleName = 'signUp';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${moduleName} started`);

    // const status = await authService.isLogin();
    // // console.log(status, $window);
    // if (status.data !== false) {
    //   $window.location.href = '#/';
    //   // return;
    // }
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
  });
  // END module
  // eslint-disable-next-line
})();
