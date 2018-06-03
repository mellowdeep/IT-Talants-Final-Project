// eslint-disable-next-line
(function() {
  const moduleName = 'search';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = {
    user: '=',
    searchData: '=',
    playlists: '=',
    search: '=',
  };
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);
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
