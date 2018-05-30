// eslint-disable-next-line
(function() {
  const moduleName = 'uploadEdit';
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
  const bindings = { uploadFile: '=' };
  function controller(dataService, $window, $element, $scope, $timeout) {
    this.videoAbout = 'about';
    this.videoTitle = 'Title';
    this.buttonEnable = true;
    this.uploadEnd = false;
    this.fileSize = '';
    this.percentComplete = 0;
    this.percentOfTrack = 0;
    this.isPrivate = 0;
    this.durationScreenShot = 0;
    this.tag = '';
    this.tags = ['music', 'news', 'trailers', 'animation'];

    this.modal = {
      get accept() {
        return this._value;
      },
      set accept(v) {
        console.log('modal ok');
        this.showModal = false;
        $window.location.href = `#/`;
        // if (v === true) {
        //   authService.logout().then(() => {});
        // }
      },
      _value: false,
      hideNo: true,
      showModal: false,
      text: 'Your video is being processed, you will be notified once processing is complete',
    };

    this.cancelButton = () => {
      // eslint-disable-next-line
      $window.location.href = '#/';
    };

    this.saveChanges = async () => {
      this.buttonEnable = true;
      const data = {
        // 'uploads[]': this.uploadFile.file,
        name: this.videoTitle,
        about: this.videoAbout,
        tag: this.tag,
        visibility: this.isPrivate,
        durationScreenShot: this.durationScreenShot,
      };

      console.log('submit', data);
      dataService.uploadContinueVideo(data).then(res => {
        // .then(res => {
        console.log('confirm data:', res);
        // this.modal.showModal = true;
        // $window.location.href = `#/video?uuid=${res.data.uuid}`;
        // });

        // $timeout(() => {
        if (res.status === 200) {
          swal({
            text: 'Your video is being processed, you will be notified once processing is complete',
            icon: 'success',
            html: true
            // buttons: { cancel: 'cancel', logout: 'logout' },
          }).then(() => ($window.location.href = `#/`));
          // .then(value => {
          //   if (value === 'logout')
          //     authService.logout().then(() => {
          //       $route.reload();
          //     });
          // });

          // this.modal.showModal = true;
        }
        // });
        // $scope.$apply(() => {
        //   if (res.status === 200) this.modal.showModal = true;
        // });

        console.log('save changes');
      });
    };

    this.selectScreenShot = e => {
      // console.log(e.offsetX, this.div.offsetWidth);
      // console.log(this.video.duration);
      this.percentOfTrack = Math.round(100 * e.offsetX / this.div.offsetWidth);
      this.video.currentTime =
        this.video.duration * e.offsetX / this.div.offsetWidth;
      this.durationScreenShot = this.video.currentTime;
      console.log(this.durationScreenShot);
    };

    this.upload = () => {
      this.uploadFile.promise
        .then(() => {
          const data = {
            'uploads[]': this.uploadFile.file,
          };
          return dataService.uploadVideo(data);
        })
        .then(res => res, null, evt => {
          this.percentComplete = parseInt(100.0 * evt.loaded / evt.total, 10);
        })
        .then(uploadResult => {
          if (uploadResult.status === 200 && uploadResult.data) {
            console.log('uploaded', this.videoSource);
            this.videoSource.attributes.src.value = uploadResult.data;
            this.video.load();
            // $timeout(() => {
            this.uploadEnd = true;
            this.buttonEnable = false;
            // });
          }
        });
    };

    this.$postLink = () => {
      this.upload();
      // eslint-disable-next-line
      this.video = $element.find('video')[0];
      // eslint-disable-next-line
      this.videoSource = $element.find('source')[0];
      this.isPrivate = 'public';
      this.tag = 'trailers';
      this.div = Array.from($element.find('div')).find(x => {
        return x.id === 'trackvideo';
      });
      console.log(this.div);
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
