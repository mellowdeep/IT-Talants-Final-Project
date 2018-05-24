// eslint-disable-next-line
(function() {
  const moduleName = 'channelBanner';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', aboutAuthor: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
