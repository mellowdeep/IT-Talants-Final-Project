(function() {
  const moduleName = 'logoMenuSearchTop';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { search: '<' };
  const injection = ['$window', '$scope', '$document'];
  function controller($window, $scope, $document) {
    console.log(`${moduleName} started`);
    this.searchText = '';

    // this.$onInit = () => {
    //   if (this.search && this.search.query) {
    //     this.searchText = this.search.query;
    //     console.log(this.search.query);
    //   }
    // };

    this.submit = () => {
      $window.location.href = `#/search?query=${this.searchText.trim()}`;
    };

    const handlerFunctions = [];
    this.dropDownSearchMenu = false;

    this.$postLink = () => {
      // setTimeout(() => console.log('-------------------', this.search), 2000);
      this.searchText = this.search;
      const fn = e => {
        if (
          e.path.every(p => p.id !== 'logo-menu-search-top-drop-down-logout')
        ) {
          $scope.$apply(() => {
            this.dropDownSearchMenu = false;
          });
        }
      };
      const event = 'click';
      handlerFunctions.push({ event, fn });
      $document.on(event, fn);
    };

    this.$onDestroy = () => {
      handlerFunctions.forEach(({ event, fn }) => $document.off(event, fn));
      console.log('destroy');
    };
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    bindings,
    controller: [...injection, controller],
  });
  // END module
})();
