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
    '$timeout',
  ];
  const bindings = { user: '=', callback: '=' };
  function controller(dataService, $window, $element, $scope, $timeout) {
    this.playlistTitle = '';
    this.isPrivate = '';
    this.buttonDisabled = false;
    this.playlists = [];

    this.modal = {
      get accept() {
        return this._value;
      },
      set accept(v) {
        this.showModal = false;
      },
      _value: false,
      hideNo: true,
      textYes: 'OK',
      showModal: false,
      text: 'All fields have to filled',
    };

    this.saveChanges = () => {
      this.buttonDisabled = true;

      if (
        this.isPrivate.trim().length === 0 ||
        this.playlistTitle.trim().length === 0
      ) {
        this.modal.showModal = true;
        this.buttonDisabled = false;
        return;
      }

      dataService
        .addPlaylist(this.playlistTitle)
        .then(res => {
          this.buttonDisabled = false;
          this.callback();
          console.log(res);
        })
        .catch(err => {
          this.buttonDisabled = false;
        });
    };

    // this.$postLink = () => {
    //   this.aboutAuthor.aboutAuthorPromise
    //     .then(() => dataService.getPlaylists(this.aboutAuthor.id))
    //     .then(({ data }) => {
    //       this.playlists = data;
    //     });
    // };

    // this.videoAbout = 'about';
    // this.videoTitle = 'Title';
    // this.buttonEnable = true;
    // this.uploadEnd = false;
    // this.fileSize = '';
    // this.percentComplete = 0;
    // this.percentOfTrack = 0;
    // this.isPrivate = 0;
    // this.durationScreenShot = 0;
    // this.tags = ['music', 'news', 'trailers', 'animation'];

    // this.cancelButton = () => {
    //   // eslint-disable-next-line
    //   $window.location.href = '#/';
    // };

    //   console.log('submit', data);
    //   dataService.uploadContinueVideo(data).then(res => {
    //     // .then(res => {
    //     console.log('confirm data:', res);
    //     // this.modal.showModal = true;
    //     // $window.location.href = `#/video?uuid=${res.data.uuid}`;
    //     // });

    //     // $timeout(() => {
    //     if (res.status === 200) this.modal.showModal = true;
    //     // });
    //     // $scope.$apply(() => {
    //     //   if (res.status === 200) this.modal.showModal = true;
    //     // });

    //     console.log('save changes');
    //   });
    // };

    // this.selectScreenShot = e => {
    //   // console.log(e.offsetX, this.div.offsetWidth);
    //   // console.log(this.video.duration);
    //   this.percentOfTrack = Math.round(100 * e.offsetX / this.div.offsetWidth);
    //   this.video.currentTime =
    //     this.video.duration * e.offsetX / this.div.offsetWidth;
    //   this.durationScreenShot = this.video.currentTime;
    //   console.log(this.durationScreenShot);
    // };

    // this.upload = () => {
    //   this.uploadFile.promise
    //     .then(() => {
    //       const data = {
    //         'uploads[]': this.uploadFile.file,
    //       };
    //       return dataService.uploadVideo(data);
    //     })
    //     .then(res => res, null, evt => {
    //       this.percentComplete = parseInt(100.0 * evt.loaded / evt.total, 10);
    //     })
    //     .then(uploadResult => {
    //       if (uploadResult.status === 200 && uploadResult.data) {
    //         console.log('uploaded', this.videoSource);
    //         this.videoSource.attributes.src.value = uploadResult.data;
    //         this.video.load();
    //         // $timeout(() => {
    //         this.uploadEnd = true;
    //         this.buttonEnable = false;
    //         // });
    //       }
    //     });
    // };

    // this.$postLink = () => {
    //   this.upload();
    //   // eslint-disable-next-line
    //   this.video = $element.find('video')[0];
    //   // eslint-disable-next-line
    //   this.videoSource = $element.find('source')[0];
    //   this.div = Array.from($element.find('div')).find(x => {
    //     return x.id === 'trackvideo';
    //   });
    //   console.log(this.div);
    // };
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
