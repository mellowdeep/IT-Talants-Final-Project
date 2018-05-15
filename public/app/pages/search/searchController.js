// eslint-disable-next-line
(function() {
  const moduleName = 'search';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = {};
  const injection = ['$location'];
  function controller($location) {
    console.log(`${moduleName} started`);
    this.search = $location.search();
    if (this.search.query) {
      console.log(`searching for ${this.search.query}`);
    }
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    bindings,
    controller: [...injection, controller],
  });
  // END module
  // eslint-disable-next-line
})();
