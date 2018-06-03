// eslint-disable-next-line
(function() {
  const moduleName = 'confirm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const bindings = { modalParams: '=' };
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);

    this.accept = value => {
      this.modalParams.accept = value;
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
  // eslint-disable-next-line
})();
