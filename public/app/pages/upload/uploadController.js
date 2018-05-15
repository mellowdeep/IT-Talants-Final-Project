// eslint-disable-next-line
(function() {
  const moduleName = 'upload';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '<' };
  const injection = ['$window'];
  function controller($window) {
    console.log(`${moduleName} started`);
    this.$onChanges = changesObj => {
      console.log(changesObj);
      if (!changesObj.user.auth) {
        // $window.location.href = '#/';
      }
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
