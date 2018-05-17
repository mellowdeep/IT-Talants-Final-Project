angular.module('app').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: `<init-page user="vm.user"></init-page>`,
        controller: 'preInitPage as vm',
      })
      .when('/login', {
        template: '<login></login>',
        controller: 'preSignUp as vm',
      })
      .when('/video', {
        template: '<single-video></single-video>',
      })
      .when('/signup', {
        template: '<sign-up></sign-up>',
        controller: 'preSignUp as vm',
      })
      .when('/upload', {
        template: `<upload user="vm.user"></upload>`,
        controller: 'preUpload as vm',
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
