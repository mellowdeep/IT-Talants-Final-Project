// eslint-disable-next-line
(function() {
  const moduleName = 'channel';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;

  // START MODULE
  // --------------------------------------------------
  const bindings = { user: '=', aboutAuthor: '=', tabValue: '=' };
  const injection = ['$location'];
  function controller($location) {
    const vm = this;

    vm.$onInit = () => {
      console.log('channel--------------', this.aboutAuthor);
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

    console.log(`${moduleName} started`);
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
