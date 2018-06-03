// eslint-disable-next-line
(function() {
  const moduleName = 'signUp';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const injection = ['authService', '$window', 'helperServices'];
  function controller(authService, $window, helperServices) {
    helperServices.log(`${moduleName} started`);
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
