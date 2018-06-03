// eslint-disable-next-line
(function() {
  const moduleName = 'channel';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;

  // START MODULE
  // --------------------------------------------------
  const bindings = {
    user: '=',
    aboutAuthor: '=',
    tabValue: '=',
    playlists: '=',
  };
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);
    const vm = this;

    vm.$onInit = () => {
      vm.menu = {
        get page() {
          return this._page;
        },
        set page(v) {
          this._page = v;
          // const search = $location.search();
          // search.tab = this._page;
          // $location.search({ ...search });
        },
        _page: vm.tabValue || 'videos',
      };
    };
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
