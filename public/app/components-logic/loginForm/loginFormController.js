// eslint-disable-next-line
(function() {
  const moduleName = 'loginForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const injection = [
    'authService',
    '$window',
    'facebookService',
    '$element',
    'helperService',
  ];
  function controller(
    authService,
    $window,
    facebookService,
    $element,
    helperService,
  ) {
    helperService.log(`${moduleName} started`);
    this.password = '';
    this.username = '';
    this.errorText = '';
    this.agreeToRemember = false;
    this.disableSubmit = false;
    let fbButton;
    this.facebook = () => {
      facebookService
        .loginToFaceBookParams()
        .then(({ response, accToken }) =>
          authService.loginFacebook({ response, accToken }),
        )
        .then(() => {
          // eslint-disable-next-line
          $window.location.href = '/#/';
        })
        .catch(res => {
          helperService.log(res);
          this.errorText = 'No connect to facebook';
        });
    };

    this.$postLink = () => {
      [fbButton] = Array.from($element.find('fb:login-button'));
      helperService.log(fbButton);
    };
    this.twitter = () => helperService.log('twitter');
    this.google = () => helperService.log('google');

    this.submit = () => {
      this.disableSubmit = false;
      const { password, username, agreeToRemember } = this;
      authService
        .login({ password, username, agreeToRemember })
        .then(() => {
          // eslint-disable-next-line
          $window.location.href = '/#/';
        })
        .catch(res => {
          helperService.log(res);
          this.errorText = 'Incorrect username or password';
        });
    };
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
  });
  // END module
})();
