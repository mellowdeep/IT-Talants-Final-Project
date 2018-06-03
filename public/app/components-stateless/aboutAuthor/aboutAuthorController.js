// eslint-disable-next-line
(function() {
  const moduleName = 'aboutAuthor';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=' };
  const injection = ['dataService', 'linkService', 'helperService'];
  function controller(dataService, linkService, helperService) {
    helperService.log(`${moduleName} started`);
    this.aboutAuthor = {};

    const updateData = () => {
      this.watchVideo.promiseDataReady
        .then(() => dataService.aboutAuthor(this.watchVideo.userId))
        .then(res => {
          this.aboutAuthor = res;
          this.aboutAuthor.linkToChannel = linkService.makeChannelLink(
            this.watchVideo.userId,
          );
        });
    };

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
      s().then(() => updateData());
    };

    this.$onInit = () => {
      updateData();
    };
  }

  // --------------------------------------------------
  // LOAD component
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
  // eslint-disable-next-line
})();
