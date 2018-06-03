// eslint-disable-next-line
(function() {
  const moduleName = 'videoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const bindings = {
    videoParams: '<',
    user: '=',
    playlists: '=',
  };

  const injection = [
    '$element',
    '$document',
    '$scope',
    'dataService',
    '$timeout',
    '$q',
    'helperService',
  ];
  function controller(
    $element,
    $document,
    $scope,
    dataService,
    $timeout,
    $q,
    helperService,
  ) {
    helperService.log(`${moduleName} started`);
    const vm = this;

    this.mouseOnVideo = false;
    this.mouseOnPlus = false;
    this.mouseOnPlayLists = false;

    this.hideAll = () => {
      this.mouseOnVideo = false;
      this.mouseOnPlus = false;
      this.mouseOnPlayLists = false;
    };

    this.showOkAdded = false;

    this.clickOnPlus = () => {
      this.mouseOnPlus = !this.mouseOnPlus;
    };

    const handlerFunctions = [];

    this.addToPlaylist = playlistId => {
      this.hideAll();
      const { uuid } = this.videoParams;
      dataService.addVideoToPlaylist({ playlistId, uuid }).then(() => {
        this.showOkAdded = true;
        $timeout(() => {
          this.showOkAdded = false;
        }, 1500);
      });
    };

    this.watchLater = () => {
      this.hideAll();
      const { uuid } = this.videoParams;
      const name = 'Watch later';
      $q
        .resolve()
        .then(() => {
          const data = this.playlists.find(item => item.name === name);
          let playlistId = null;

          if (data) {
            // eslint-disable-next-line prefer-destructuring
            playlistId = data.playlistId;
          }
          if (playlistId) return { data: playlistId };
          return dataService.addPlaylist({ name, visibility: 'private' });
        })
        .then(({ data }) => {
          const playlistId = data;
          return dataService.addVideoToPlaylist({ playlistId, uuid });
        })
        .then(() => {
          vm.showOkAdded = true;
          $timeout(() => {
            vm.showOkAdded = false;
          }, 1700);
          return dataService.getPlaylists(this.user.id);
        })
        .then(({ data }) => {
          this.playlists.length = 0;
          this.playlists.push(...data);
        });
    };

    this.addToNewPlaylist = () => {
      this.hideAll();
      const { uuid } = vm.videoParams;

      // eslint-disable-next-line angular/document-service
      const input = document.createElement('input');
      input.type = 'text';

      swal({
        title: 'Playlist name',
        content: input,
        buttons: {
          private: {
            text: 'private',
            visible: true,
            closeModal: true,
          },
          public: {
            text: 'public',
            visible: true,
            closeModal: true,
          },
          cancel: {
            text: 'cancel',
            visible: true,
            closeModal: true,
          },
        },
      })
        .then(val => {
          const name = input.value;

          if (name.trim().length === 0 && val !== null) {
            swal({ text: 'Playlist requires a name', icon: 'warning' });
            return { name: null, visibility: null };
          }

          switch (val) {
            case 'private':
              return { name, visibility: 'private' };
            case 'public':
              return { name, visibility: 'public' };
            default:
              return { name: null, visibility: null };
          }
        })
        .then(({ name, visibility }) => {
          if (name)
            dataService
              .addPlaylist({ name, visibility })
              .then(({ data }) => {
                const playlistId = data;
                return dataService.addVideoToPlaylist({ playlistId, uuid });
              })
              .then(() => {
                vm.showOkAdded = true;
                $timeout(() => {
                  vm.showOkAdded = false;
                }, 1700);
                return dataService.getPlaylists(this.user.id);
              })
              .then(({ data }) => {
                this.playlists.length = 0;
                this.playlists.push(...data);
              });
        });
    };

    this.$postLink = () => {
      const elPlus = Array.from($element.find('div')).find(e =>
        e.matches('.plus'),
      );

      const ulPlayLists = Array.from($element.find('li')).find(
        e => e.attributes.name && e.attributes.name.value === 'playlists',
      );

      const fn = e => {
        const mouseOnVideo = e.path.some(elem => elem === $element[0]);
        const mouseOnPlus = e.path.some(elem => elem === elPlus);
        const mouseOnPlayLists = e.path.some(elem => elem === ulPlayLists);

        if (
          this.mouseOnVideo !== mouseOnVideo ||
          this.mouseOnPlayLists !== mouseOnPlayLists
        ) {
          $scope.$apply(() => {
            this.mouseOnVideo = mouseOnVideo || mouseOnPlayLists || mouseOnPlus;
            this.mouseOnPlus =
              this.mouseOnPlus === true || mouseOnPlus || mouseOnPlayLists;
            this.mouseOnPlayLists = mouseOnPlayLists;
            if (this.mouseOnVideo === false) {
              this.mouseOnPlus = false;
              this.mouseOnPlayLists = false;
            }
          });
        }
      };

      const event = 'mousemove';
      handlerFunctions.push({ event, fn });
      $document.on(event, fn);
    };

    this.$onDestroy = () => {
      handlerFunctions.forEach(({ event, fn }) => $document.on(event, fn));
      helperService.log(`${moduleName} destroy`);
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
