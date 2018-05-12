angular.module('app').factory('authService', function($http) {
  return {
    signUp,
  };

  function signUp({ password1, password2, username, name }) {
    $http
      .post('/register', { password1, password2, username, name })
      .then(res => console.log(res));
  }

  // const cacheSession = function() {
  //   SessionService.set('authenticated', true);
  // };
  // const uncacheSession = function() {
  //   SessionService.unset('authenticated');
  // };
  // const loginError = function(response) {
  //   FlashService.show(response.flash);
  // };
  // const sanitizeCredentials = function(credentials) {
  //   return {
  //     email: $sanitize(credentials.email),
  //     password: $sanitize(credentials.password),
  //     csrf_token: CSRF_TOKEN,
  //   };
  // };
  // return {
  //   login: function(credentials) {
  //     var login = $http.post('/auth/login', sanitizeCredentials(credentials));
  //     login.success(cacheSession);
  //     login.success(FlashService.clear);
  //     login.error(loginError);
  //     return login;
  //   },
  //   logout: function() {
  //     var logout = $http.get('/auth/logout');
  //     logout.success(uncacheSession);
  //     return logout;
  //   },
  //   isLoggedIn: function() {
  //     return SessionService.get('authenticated');
  //   },
  // };
});
