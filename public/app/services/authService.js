angular.module('app').factory('authService', [
  '$q',
  '$http',
  'linkService',
  'helperService',
  function($q, $http, linkService, helperService) {
    const data = {
      get user() {
        return this._user;
      },
      set user(v) {
        helperService.log('login data', v);
        this._user.firstTime = false;
        this._user.auth = v.auth;
        this._user.id = v.id;
        this._user.image = v.image;
        this._user.name = v.name;
        this._user.role = v.role;
        this._user.status = v.status;
        this._user.linkToPage = v.id ? linkService.makeChannelLink(v.id) : null;
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
      loginFacebook,
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
      return $q.resolve(data.user);
    }

    function authObj() {
      return data.user;
    }

    function logout() {
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

    function loginFacebook({ response, accToken }) {
      const url = `/login/facebook`;
      return $http.post(url, { response, accToken }).then(res => {
        if (res.data === false) data.user = USER_NOT_LOGGED;
        else {
          data.user = res.data;
          data.user.auth = true;
        }
        return data.user;
      });
    }
  },
]);
