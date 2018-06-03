// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylistsItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { user: '=', playlist: '=', callback: '=' };

  const injection = ['dataService', 'helperService'];
  function controller(dataService, helperService) {
    helperService.log(`${moduleName} started`);

    const vm = this;

    this.deletePlaylist = () => {
      swal({
        text: `Do you want to delete playlist: ${vm.playlist.name}?`,
        buttons: {
          cancel: 'Cancel',
          ok: 'OK',
        },
        icon: 'warning',
      }).then(value => {
        switch (value) {
          case 'cancel':
            break;
          case 'ok':
            dataService.removePlaylist(vm.playlist.playlistId).then(() => {
              vm.callback();
            });
            break;
          default:
            break;
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
