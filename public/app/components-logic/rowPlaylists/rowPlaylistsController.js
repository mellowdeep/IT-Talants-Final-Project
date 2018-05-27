// eslint-disable-next-line
(function() {
  const moduleName = 'rowPlaylists';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['dataService'];
  function controller(dataService) {
    console.log(`${moduleName} started`);

    this.playlistLatest = [];
    this.$onInit = () => {
      dataService.playlistLatest().then(res => {
        this.playlistLatest.push(...res.data);
        console.log(this.playlistLatest);
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
