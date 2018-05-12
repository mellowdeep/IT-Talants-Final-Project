angular.module('app').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: `<init-page></init-page>`,
      })
      .when('/login', {
        template: '<login></login>',
      })
      .when('/signup', {
        template: '<sign-up></sign-up>',
      })
      .when('/search', {
        template: '<search></search>',
      })
      .when('/test', {
        template: '<h1>h to test</h1>',
      })
      .otherwise('/');
  },
]);
