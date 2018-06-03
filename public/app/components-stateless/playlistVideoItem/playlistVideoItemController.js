// eslint-disable-next-line
(function() {
  const moduleName = 'playlistVideoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = {
    videoParams: '<',
    watchVideo: '=',
    currentVideoPlalist: '=',
  };

  const injection = ['helperService'];

  function controller(helperService) {
    helperService.log(`${moduleName} started`);
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
