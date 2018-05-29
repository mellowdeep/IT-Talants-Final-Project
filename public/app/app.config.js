angular.module('app').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: `<init-page user="vm.user" init-data="vm.initData"  subscribes="vm.subscribes"  playlists="vm.playlists"></init-page>`,
        controller: 'preInitPage as vm',
      })
      .when('/login', {
        template: '<login></login>',
        controller: 'preSignUp as vm',
      })
      .when('/video', {
        template:
          '<single-video user="vm.user" watch-video="vm.watchVideo"></single-video>',
        controller: 'preVideo as vm',
      })
      .when('/playlist', {
        template:
          '<playlist-video user="vm.user" watch-video="vm.watchVideo" playlist-videos="vm.playlistVideos"></playlist-video>',
        controller: 'prePlaylistVideo as vm',
      })
      .when('/signup', {
        template: '<sign-up></sign-up>',
        controller: 'preSignUp as vm',
      })
      .when('/upload', {
        template: `<upload user="vm.user"></upload>`,
        controller: 'preUpload as vm',
      })
      .when('/admin', {
        template: `<admin user="vm.user" videos-to-approve="vm.videosToApprove"></admin>`,
        controller: 'preAdmin as vm',
      })
      .when('/channel', {
        template: `<channel user="vm.user" tab-value="vm.tab" about-author="vm.aboutAuthor" playlists="vm.playlists"></channel>`,
        controller: 'preChannel as vm',
      })
      .when('/search', {
        template:
          '<search search="vm.search" search-data="vm.searchData" user="vm.user" playlists="vm.playlists"></search>',
        controller: 'preSearch as vm',
      })
      .when('/test', {
        template: '<h1>h to test</h1>',
      })
      .when('/404', {
        template: '<page404>h to test</page404>',
      })
      .otherwise('/404');
  },
]);
