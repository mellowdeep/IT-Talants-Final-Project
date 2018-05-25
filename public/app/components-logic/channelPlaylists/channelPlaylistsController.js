// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylists';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', aboutAuthor: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);
    this.playlists = [];

    this.updateData = () => {
      dataService.getPlaylists(this.aboutAuthor.id).then(({ data }) => {
        this.playlists = data;
        console.log('playlists', this.playlists);
      });
    };

    this.$postLink = () => {
      this.aboutAuthor.aboutAuthorPromise.then(() => this.updateData());
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
