// eslint-disable-next-line
(function() {
  const moduleName = 'channelUpdate';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------

  const bindings = { subscribes: '=' };
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);
    this.$onInit = () => {};
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
