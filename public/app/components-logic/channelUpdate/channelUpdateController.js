// eslint-disable-next-line
(function() {
  const moduleName = 'channelUpdate';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['dataService'];
  const bindings = { subscribes: '=' };
  function controller(dataService) {
    console.log(`${moduleName} started`);
    this.subscribes = [];
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
