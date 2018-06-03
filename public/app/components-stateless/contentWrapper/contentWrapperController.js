// eslint-disable-next-line
(function() {
  const moduleName = 'contentWrapper';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = {};
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    transclude: true,
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
