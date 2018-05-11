angular.module('app').config([
  '$locationProvider',
  '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/', {
        template: `<logo-menu></logo-menu>
                    <go-to></go-to>
                    <content-wrapper>
                      <channel-update></channel-update>
                      <row-videos></row-videos>
                      <row-playlists></row-playlists>
                      <row-channels></row-channels>
                      <pagination></pagination>
                    </content-wrapper>
                  <row-footer></row-footer`,
      })
      .when('/test', {
        template: '<h1>h to test</h1>',
      })
      .otherwise('/');
  },
]);
