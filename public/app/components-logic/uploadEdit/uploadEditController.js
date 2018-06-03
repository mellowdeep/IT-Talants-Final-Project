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
    'helperService',
    'linkService',
  ];
  const bindings = { uploadFile: '=' };
  function controller(
    dataService,
    $window,
    $element,
    $scope,
    $timeout,
    helperService,
    linkService,
  ) {
    helperService.log(`${moduleName} started`);

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

    this.cancelButton = () => {
      linkService.redirect(linkService.homeLink());
    };

    this.saveChanges = async () => {
      this.buttonEnable = true;
      const data = {
        name: this.videoTitle,
        about: this.videoAbout,
        tag: this.tag,
        visibility: this.isPrivate,
        durationScreenShot: this.durationScreenShot,
      };

      dataService.uploadContinueVideo(data).then(res => {
        if (res.status === 200) {
          swal({
            text:
              'Your video is being processed, you will be notified once processing is complete',
            icon: 'success',
            html: true,
          }).then(() => linkService.redirect(linkService.homeLink()));
        }
      });
    };

    this.selectScreenShot = e => {
      this.percentOfTrack = Math.round(100 * e.offsetX / this.div.offsetWidth);
      this.video.currentTime =
        this.video.duration * e.offsetX / this.div.offsetWidth;
      this.durationScreenShot = this.video.currentTime;
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
            helperService.log('uploaded', this.videoSource);
            this.videoSource.attributes.src.value = uploadResult.data;
            this.video.load();
            this.uploadEnd = true;
            this.buttonEnable = false;
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
      this.div = Array.from($element.find('div')).find(
        x => x.id === 'trackvideo',
      );
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
