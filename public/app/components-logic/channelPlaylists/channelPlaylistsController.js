// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylists';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { user: '=', aboutAuthor: '=', myPlaylists: '=' };

  const injection = ['dataService', 'helperService'];
  function controller(dataService, helperService) {
    helperService.log(`${moduleName} started`);
    this.playlists = [];

    this.updateData = () => {
      dataService.getPlaylists(this.aboutAuthor.id).then(({ data }) => {
        this.playlists.length = 0;
        this.playlists.push(...data);
      });
    };

    this.$postLink = () => {
      this.aboutAuthor.aboutAuthorPromise.then(() => {
        if (this.aboutAuthor.id === this.user.id) {
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
