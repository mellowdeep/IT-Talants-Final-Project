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
  const injection = ['dataService', 'linkService'];
  function controller(dataService, linkService) {
    this.aboutAuthor = {};

    const updateData = () => {
      this.watchVideo.promiseDataReady
        .then(() => dataService.aboutAuthor(this.watchVideo.userId))
        .then(res => {
          this.aboutAuthor = res;
          this.aboutAuthor.linkToChannel = linkService.makeChannelLink(
            this.watchVideo.userId,
          );
          console.log('about author', this.aboutAuthor);
        });

      // dislikes;
      // id;
      // likes;
      // name;
      // videos;
      // views;
      // ? image
      // ? subscribes
    };

    this.modal = {
      get accept() {
        return this._value;
      },
      set accept(v) {
        this.showModal = false;
      },
      _value: false,
      showModal: false,
      hideNo: true,
      text: 'Please login for subscribe',
      textYes: 'Ok',
    };

    this.subscribe = () => {
      if (!this.user.auth) {
        this.modal.showModal = true;
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
