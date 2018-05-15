// eslint-disable-next-line
(function() {
  const moduleName = 'loginForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const injection = ['authService', '$window'];
  function controller(authService, $window) {
    console.log(`${moduleName} started`);
    this.password = '';
    this.username = '';
    this.agreeToRemember = false;

    this.submit = () => {
      const { password, username, agreeToRemember } = this;
      authService.login({ password, username, agreeToRemember }).then(() => {
        // eslint-disable-next-line
        $window.location.href = '/#/';
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
