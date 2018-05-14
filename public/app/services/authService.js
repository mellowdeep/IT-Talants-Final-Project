angular.module('app').factory('authService', function($http) {
  const USER_NOT_LOGGED = { auth: false };
  let user = null;

  return {
    signUp,
    login,
    isLogin,
    auth,
    logout,
  };

  function auth() {
    if (user === null) return isLogin();
    return Promise.resolve(user);
  }

  function logout() {
    // return Promise.resolve().then(isLogin);
    return $http.get('/logout').then(isLogin);
  }

  function isLogin() {
    return $http.get('/login').then(res => {
      console.log('user', res.data);
      if (res.data === false) user = USER_NOT_LOGGED;
      else {
        user = res.data;
        user.auth = true;
      }
      return user;
    });
  }

  function signUp({ password1, password2, username, name }) {
    return $http
      .post('/register', { password1, password2, username, name })
      .then(res => {
        if (res.data === false) user = USER_NOT_LOGGED;
        else {
          user = res.data;
          user.auth = true;
        }
        return res;
      });
    // .then(res => res.json());
  }

  function login({ password, username /* , agreeToRemember */ }) {
    return $http.post('/login', { password, username }).then(res => {
      if (res.data === false) user = USER_NOT_LOGGED;
      else {
        user = res.data;
        user.auth = true;
      }
      return user;
    });
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
