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
  function controller(dataService) {
    console.log(`${moduleName} started`);
    this.subscribes = [];
    this.$onInit = () => {
      dataService.getSubscribesAll().then(res => {
        this.subscribes.push(...res.data);
        console.log(this.subscribes);
      });
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
  });
  // END module
  // eslint-disable-next-line
})();
