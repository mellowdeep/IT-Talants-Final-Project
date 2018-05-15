// eslint-disable-next-line
(function() {
  const moduleName = 'upload';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '=' };
  const injection = ['$window', '$scope'];
  function controller($window, $scope) {
    console.log(`${moduleName} started`);

    this.$onChanges = changesObj => {
      console.log(changesObj);
    };

    // setInterval(() => console.log(this.user), 1000);

    $scope.$watch(
      '$ctrl.name',
      function(newValue, oldValue) {
        console.log('watch', newValue, oldValue);
      },
      true,
    );

    // this.$onChanges = user => {
    //   console.log(user);
    //   if (user.currentValue && !user.currentValue.auth) {
    //     console.log('change location');
    //     // eslint-disable-next-line
    //     $window.location.href = '#/';
    //   }
    // };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
