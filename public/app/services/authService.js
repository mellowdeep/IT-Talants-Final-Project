angular.module('app').factory('authService', [
  '$q',
  '$http',
  function($q, $http) {
    const data = {
      get user() {
        return this._user;
      },
      set user(v) {
        console.log('login data', v);
        this._user.firstTime = false;
        this._user.auth = v.auth;
        this._user.id = v.id;
        this._user.image = v.image;
        this._user.name = v.name;
        this._user.role = v.role;
        this._user.status = v.status;
        this.callbackArray.forEach(f => {
          f(this._user);
        });
      },
      _user: { auth: false, firstTime: true },
      callbackArray: [],
    };

    const USER_NOT_LOGGED = { auth: false, id: -1 };

    return {
      signUp,
      login,
      isLogin,
      auth,
      logout,
      authObj,
      digest,
      removeDigest,
    };

    function digest(fn) {
      data.callbackArray.push(fn);
    }

    function removeDigest(fn) {
      const idx = data.callbackArray.indexOf(fn);
      if (idx !== -1) data.callbackArray.splice(idx, 1);
    }

    function auth() {
      if (data.user.firstTime) return isLogin();
      return Promise.resolve(data.user);
    }

    function authObj() {
      return data.user;
    }

    function logout() {
      // return Promise.resolve().then(isLogin);
      return $http.get('/logout').then(isLogin);
    }

    function isLogin() {
      return $http.get('/login').then(res => {
        if (res.data === false) data.user = USER_NOT_LOGGED;
        else {
          data.user = res.data;
          data.user.auth = true;
        }
        return data.user;
      });
    }

    function signUp({ password1, password2, username, name }) {
      return $http
        .post('/register', { password1, password2, username, name })
        .then(res => {
          if (res.data === false) data.user = USER_NOT_LOGGED;
          else {
            data.user = res.data;
            data.user.auth = true;
          }
          return res;
        });
    }

    function login({ password, username /* , agreeToRemember */ }) {
      return $http.post('/login', { password, username }).then(res => {
        if (res.data === false) data.user = USER_NOT_LOGGED;
        else {
          data.user = res.data;
          data.user.auth = true;
        }
        return data.user;
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
  },
]);
