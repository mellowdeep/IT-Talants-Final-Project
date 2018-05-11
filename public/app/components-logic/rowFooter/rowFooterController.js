// eslint-disable-next-line
(function() {
  const moduleName = 'rowFooter';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller() {
    console.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, { templateUrl, controller });
  // END module
  // eslint-disable-next-line
})();
