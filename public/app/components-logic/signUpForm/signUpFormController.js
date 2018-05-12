// eslint-disable-next-line
(function() {
  const moduleName = 'signUpForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  function controller(authService) {
    this.name = '';
    this.username = '';
    this.password1 = '';
    this.password2 = '';

    this.submit = () => {
      const { name, username, password1, password2 } = this;
      authService.signUp({
        name,
        username,
        password1,
        password2,
      });
    };

    console.log(`${moduleName} started`);
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: ['authService', controller],
  });
  // END module
  // eslint-disable-next-line
})();
