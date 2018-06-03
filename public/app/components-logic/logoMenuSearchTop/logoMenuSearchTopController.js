(function() {
  const moduleName = 'logoMenuSearchTop';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = { search: '<' };
  const injection = [
    '$window',
    '$scope',
    '$document',
    'helperService',
    'linkService',
  ];
  function controller($window, $scope, $document, helperService, linkService) {
    helperService.log(`${moduleName} started`);
    this.searchText = '';

    this.submit = () => {
      if (this.searchText.trim().length === 0) {
        linkService.redirect(linkService.homeLink());
      } else {
        linkService.redirect(linkService.makeSearchLink(this.searchText));
      }
    };

    const handlerFunctions = [];
    this.dropDownSearchMenu = false;

    this.$postLink = () => {
      // setTimeout(() => console.log('-------------------', this.search), 2000);
      this.searchText = this.search || '';
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
