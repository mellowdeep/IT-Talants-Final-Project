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
  const injection = ['dataService'];
  function controller(dataService) {
    this.aboutAuthor = {};

    const updateData = async () => {
      await this.watchVideo.promiseDataReady;
      this.aboutAuthor = await dataService.aboutAuthor(this.watchVideo.user_id);
      const sum = this.aboutAuthor.likes + this.aboutAuthor.dislikes;
      if (sum)
        this.aboutAuthor.percent = Math.floor(
          this.aboutAuthor.likes * 100 / sum,
        );
      else this.aboutAuthor.percent = 0;
      console.log(this.aboutAuthor);
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
