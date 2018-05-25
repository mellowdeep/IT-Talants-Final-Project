// eslint-disable-next-line
(function() {
  const moduleName = 'channelPlaylistsItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', playlist: '=', callback: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);
    // this.playlists = [];

    const vm = this;
    this.modal = {
      get accept() {
        return this._value;
      },
      set accept(v) {
        this.showModal = false;
        if (v === true)
          dataService.removePlaylist(vm.playlist.playlistId).then(() => {
            vm.callback();
          });
      },
      _value: false,
      hideNo: false,
      hideYes: false,
      textYes: 'Yes',
      showModal: false,
      text: 'All fields have to filled',
    };

    this.deletePlaylist = () => {
      this.modal.showModal = true;
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
