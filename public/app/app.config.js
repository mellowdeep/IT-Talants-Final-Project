angular.module('app').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: '<main-page></main-page>',
      })
      .when('/test', {
        template: '<test></test>',
      })
      .otherwise('/');
  },
]);
