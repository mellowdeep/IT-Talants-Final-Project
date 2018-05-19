// eslint-disable-next-line
(function() {
  const moduleName = 'uploadEdit';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const injection = ['dataService', '$window', '$element', '$scope'];
  const bindings = { uploadFile: '=' };
  function controller(dataService, $window, $element, $scope) {
    this.videoAbout = 'about';
    this.videoTitle = 'Title';
    this.buttonEnable = true;
    this.uploadEnd = false;
    this.fileSize = '';
    this.percentComplete = 0;
    this.percentOfTrack = 0;
    this.isPrivate = 0;
    this.durationScreenShot = 0;
    this.tags = ['music', 'nature', 'news'];

    this.cancelButton = () => {
      // eslint-disable-next-line
      $window.location.href = '#/';
    };

    this.saveChanges = () => {
      const data = {
        // 'uploads[]': this.uploadFile.file,
        name: this.videoTitle,
        about: this.videoAbout,
        tag: this.tag,
        visibility: this.isPrivate,
        durationScreenShot: this.durationScreenShot,
      };

      dataService.uploadContinueVideo(data).then(res => {
        console.log('confirm data:', res);
        $window.location.href = `#/`;
        // $window.location.href = `#/video?uuid=${res.data.uuid}`;
      });
      console.log('save changes');
    };

    this.selectScreenShot = e => {
      // console.log(e.offsetX, this.div.offsetWidth);
      // console.log(this.video.duration);
      this.percentOfTrack = Math.round(100 * e.offsetX / this.div.offsetWidth);
      this.video.currentTime = Math.round(
        this.video.duration * e.offsetX / this.div.offsetWidth,
      );
      this.durationScreenShot = this.video.currentTime;
    };

    this.upload = async () => {
      await this.uploadFile.promise;
      const data = {
        'uploads[]': this.uploadFile.file,
      };

      const uploadResult = await dataService
        .uploadVideo(data)
        .then(res => res, null, evt => {
          this.percentComplete = parseInt(100.0 * evt.loaded / evt.total, 10);
        });

      if (uploadResult.status === 200 && uploadResult.data) {
        console.log('uploaded', this.videoSource);
        this.videoSource.attributes.src.value = uploadResult.data;
        this.video.load();
        $scope.$apply(() => {
          this.uploadEnd = true;
          this.buttonEnable = false;
        });
      }
    };
    this.$postLink = () => {
      this.upload();
      // eslint-disable-next-line
      this.video = $element.find('video')[0];
      // eslint-disable-next-line
      this.videoSource = $element.find('source')[0];
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
