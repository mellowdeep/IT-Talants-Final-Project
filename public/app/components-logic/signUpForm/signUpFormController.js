// eslint-disable-next-line
(function() {
  const moduleName = 'signUpForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['authService', '$window'];
  async function controller(authService) {
    console.log(`${moduleName} started`);

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
        .then(res => console.log(res))
        .catch(e => {
          // console.log(e.data);
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
