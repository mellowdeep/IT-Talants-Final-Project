// eslint-disable-next-line
(function() {
  const moduleName = 'channelVideos';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { user: '<', aboutAuthor: '<', playlists: '=' };

  const injection = ['dataService', 'helperService'];
  function controller(dataService, helperService) {
    helperService.log(`${moduleName} started`);

    this.videos = [];

    this.$postLink = () => {
      helperService.log(
        '----------------------------',
        this.aboutAuthor.aboutAuthorPromise.toString(),
      );
      this.aboutAuthor.aboutAuthorPromise
        .then(() => dataService.userVideos(this.aboutAuthor.id))
        .then(({ data }) => {
          this.videos = data;
        });
    };
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
