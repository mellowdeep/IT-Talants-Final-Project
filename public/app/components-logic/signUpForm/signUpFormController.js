// eslint-disable-next-line
(function() {
  const moduleName = 'signUpForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const injection = ['authService', '$window', 'helperService', 'linkService'];
  function controller(authService, $window, helperService, linkService) {
    helperService.log(`${moduleName} started`);

    this.name = '';
    this.username = '';
    this.password1 = '';
    this.password2 = '';
    this.error = [];

    this.submit = () => {
      const { name, username, password1, password2 } = this;
      authService
        .signUp({
          name,
          username,
          password1,
          password2,
        })
        .then(() => {
          linkService.redirect(linkService.loginLink());
        })
        .catch(e => {
          helperService.log(e.data);
          this.error = e.data.map(({ msg }) => msg);
          this.password1 = '';
          this.password2 = '';
        });
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
  });
  // END module
  // eslint-disable-next-line
})();
