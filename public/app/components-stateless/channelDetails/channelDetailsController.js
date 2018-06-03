// eslint-disable-next-line
(function() {
  const moduleName = 'channelDetails';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------
  const bindings = { aboutAuthor: '=', user: '=' };
  const injection = ['dataService', '$window', 'helperService', 'linkService'];
  function controller(dataService, $window, helperService, linkService) {
    helperService.log(`${moduleName} started`);

    this.subscribe = () => {
      if (!this.user.auth) {
        swal({
          title: 'Please login for subscribe',
          icon: 'info',
        }).then(() => {
          linkService.redirect(linkService.loginLink());
        });
        return;
      }

      const s = () => {
        if (this.aboutAuthor.isSubscribed)
          return dataService.unsubscribe(this.aboutAuthor.id);
        return dataService.subscribe(this.aboutAuthor.id);
      };
      s()
        .then(() => dataService.aboutAuthor(this.aboutAuthor.id))
        .then(({ isSubscribed, subscribesCount }) => {
          this.aboutAuthor.isSubscribed = isSubscribed;
          this.aboutAuthor.subscribesCount = subscribesCount;
        });
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    transclude: true,
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
