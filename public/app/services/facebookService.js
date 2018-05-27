angular.module('app').factory('facebookService', [
  '$rootScope',
  '$window',
  '$q',
  function($rootScope, $window, $q) {
    // $rootScope.user = {};

    $window.fbAsyncInit = function() {
      FB.init({
        appId: '968381570005893',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.0',
      });

      // checkLoginState();
    };

    (function(d, s, id) {
      let js;
      let fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    const loginToFaceBookParams = () => {
      const deferred = $q.defer();
      FB.api('/me', { fields: 'id,name,email,picture' }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          const accToken = FB.getAuthResponse();
          deferred.resolve({ response, accToken });
        }
      });
      return deferred.promise;
    };

    return {
      loginToFaceBookParams,
    };
  },
]);
