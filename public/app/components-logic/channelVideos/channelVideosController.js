// eslint-disable-next-line
(function() {
  const moduleName = 'channelVideos';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '<', aboutAuthor: '<' };

  function controller(dataService) {
    console.log(`${moduleName} started`);

    this.videos = [];

    // this.userVideos = [];
    // this.$onInit = () => {
    //   setTimeout(() => console.log('-----------', this.aboutAuthor), 10000);
    // };

    this.$onChanges = changes => {
      if (
        this.aboutAuthor &&
        changes.aboutAuthor &&
        // angular.isDefined(changes.aboutAuthor.currentValue) &&
        changes.aboutAuthor.isFirstChange()
      ) {
        console.log(this.aboutAuthor);
        this.aboutAuthor.aboutAuthorPromise
          .then(() => dataService.userVideos(this.aboutAuthor.id))
          .then(({ data }) => {
            this.videos = data;
          });
      }
    };

    // about-author="$ctrl.aboutAuthor"
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
