// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylists';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', aboutAuthor: '=', myPlaylists: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);
    this.playlists = [];

    this.updateData = () => {
      dataService.getPlaylists(this.aboutAuthor.id).then(({ data }) => {
        this.playlists.length = 0;
        this.playlists.push(...data);
        console.log('playlists', this.playlists);
      });
    };

    this.$postLink = () => {
      this.aboutAuthor.aboutAuthorPromise.then(() => {
        console.log('test', this.myPlaylists);
        if (this.aboutAuthor.id === this.user.id) {
          console.log('equal-------------');
          this.playlists = this.myPlaylists;
        } else {
          this.updateData();
        }
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
