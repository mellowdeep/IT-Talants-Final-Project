// eslint-disable-next-line
(function() {
  const moduleName = 'rowPlaylists';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const injection = ['dataService', 'helperService'];
  function controller(dataService, helperService) {
    helperService.log(`${moduleName} started`);

    this.playlistLatest = [];
    this.$onInit = () => {
      dataService.playlistLatest().then(res => {
        this.playlistLatest.push(...res.data);
        helperService.log(this.playlistLatest);
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
