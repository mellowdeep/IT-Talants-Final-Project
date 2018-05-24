// eslint-disable-next-line
(function() {
  const moduleName = 'aboutAuthor';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------
  const bindings = { watchVideo: '=' };
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

    this.subscribe = () => {
      console.log('subscribe / unsubscribe');
      updateData();
    };

    this.$onInit = async () => {
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
