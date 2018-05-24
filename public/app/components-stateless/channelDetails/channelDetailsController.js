// eslint-disable-next-line
(function() {
  const moduleName = 'channelDetails';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { aboutAuthor: '=', user: '=' };
  // const require = ['^about-author'];
  const injection = ['dataService'];
  function controller(dataService) {
    console.log(`${moduleName} started`);

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

    console.log('chd', this.aboutAuthor);

    this.subscribe = () => {
      console.log('test', this.user);
      if (!this.user.auth) {
        this.modal.showModal = true;
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

    // this.$onInit = () => {
    //   if (!this.wrapperClass) this.wrapperClass = 'col-lg-12';
    // };
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
