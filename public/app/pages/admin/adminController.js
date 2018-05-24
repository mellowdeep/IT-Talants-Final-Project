// eslint-disable-next-line
(function() {
  const moduleName = 'admin';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;

  // START MODULE
  // --------------------------------------------------
  const bindings = { user: '=' };
  const injection = [];
  function controller() {
    console.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  angular
    .module('app')
    .component(moduleName, {
      templateUrl,
      controller: [...injection, controller],
      bindings,
    });
  // END module
  // eslint-disable-next-line
})();
