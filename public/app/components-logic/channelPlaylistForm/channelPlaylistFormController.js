// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylistForm';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const injection = [
    'dataService',
    '$window',
    '$element',
    '$scope',
    'helperService',
  ];
  const bindings = { user: '=', callback: '=' };
  function controller(dataService, $window, $element, $scope, helperService) {
    helperService.log(`${moduleName} started`);
    this.playlistTitle = '';
    this.isPrivate = '';
    this.buttonDisabled = false;
    this.playlists = [];

    this.saveChanges = () => {
      this.buttonDisabled = true;

      if (
        this.isPrivate.trim().length === 0 ||
        this.playlistTitle.trim().length === 0
      ) {
        swal({ text: 'Playlist requires a name', icon: 'warning' });
        this.buttonDisabled = false;
        return;
      }

      dataService
        .addPlaylist({ name: this.playlistTitle, visibility: this.isPrivate })
        .then(() => {
          this.buttonDisabled = false;
          this.callback();
        })
        .catch(() => {
          this.buttonDisabled = false;
        });
    };

    this.$postLink = () => {
      this.isPrivate = 'public';
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
})();
