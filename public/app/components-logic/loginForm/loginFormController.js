// eslint-disable-next-line
(function() {
  const moduleName = 'loginForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const injection = ['authService', '$window', 'facebookService','$element'];
  function controller(authService, $window, facebookService,$element) {
    console.log(`${moduleName} started`);
    this.password = '';
    this.username = '';
    this.errorText = '';
    this.agreeToRemember = false;
    this.disableSubmit = false;
    let fbButton;
    this.facebook = () => {
      facebookService
        .loginToFaceBookParams()
        .then(({ response, accToken }) => {
          console.log({ response, accToken });
          return authService.loginFacebook({ response, accToken });
        })
        .then(() => {
          // eslint-disable-next-line
          $window.location.href = '/#/';
        })
        .catch(res => {
          // console.log(res);
          this.errorText = 'No connect to facebook';
        });
    };

    this.$postLink= ()=>{
       // fbButton = $element.find('fb')[0];
       // console.log(fbButton)
    }
    this.twitter = () => console.log('twitter');
    this.google = () => console.log('google');

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
          // console.log(res);
          this.errorText = 'Incorrect username or password';
        });
      // console.log();
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
