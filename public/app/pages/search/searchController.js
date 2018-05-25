// eslint-disable-next-line
(function() {
  const moduleName = 'search';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = {
    user: '=',
    searchData: '=',
    playlists: '=',
    search: '=',
  };
  const injection = ['$location'];
  function controller($location) {
    console.log(`${moduleName} started`);
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
