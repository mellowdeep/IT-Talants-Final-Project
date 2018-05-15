// eslint-disable-next-line
(function() {
  const moduleName = 'initPage';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;

  // START MODULE
  // --------------------------------------------------
  const bindings = { user: '<' };
  function controller() {
    console.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  angular
    .module('app')
    .component(moduleName, { templateUrl, controller, bindings });
  // END module
  // eslint-disable-next-line
})();
