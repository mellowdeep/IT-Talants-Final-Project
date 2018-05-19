// eslint-disable-next-line
(function() {
  const moduleName = 'uploadEdit';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['dataService', '$window', '$element'];
  const bindings = { uploadFile: '=' };
  function controller(dataService, $window, $element) {
    this.videoAbout = 'about';
    this.videoTitle = 'Title';
    this.buttonEnable = false;
    this.uploadEnd = false;
    this.fileSize = '';
    this.percentComplete = 0;
    this.percentOfTrack = 0;
    this.isPrivate = 0;
    this.timeScreenShot = 0;
    this.tags = ['music', 'nature', 'news'];

    this.cancelButton = () => {
      // eslint-disable-next-line
      $window.location.href = '#/';
      // console.log('cancel button');
    };

    this.saveChanges = () => console.log('save changes');

    this.selectScreenShot = e => {
      console.log(e.offsetX, this.div.offsetWidth);
      // console.log();
      // console.log(this.video.duration);
      console.log(this.video.duration);
      this.percentOfTrack = Math.round(100 * e.offsetX / this.div.offsetWidth);
      this.video.currentTime = Math.round(
        this.video.duration * e.offsetX / this.div.offsetWidth,
      );
      this.timeScreenShot = this.video.currentTime;
    };

    this.upload = async () => {
      console.log('start upload await');
      await this.uploadFile.promise;
      console.log('end await');
      const data = {
        'uploads[]': this.uploadFile.file,
        // name: this.videoTitle,
        // about: this.videoAbout,
        // tag: this.tag,
        // visibility: this.isPrivate,
        // durationScreenShot
      };
      this.buttonEnable = true;
      return dataService.uploadVideo(data).then(
        res => {
          // console.log(`#/video?uuid=${res.data.uuid}`, res);
          if (res.status === 200 && res.data.uuid) {
            console.log(res.data);
            this.uploadEnd = true;
            // eslint-disable-next-line
            // $window.location.href = `#/video?uuid=${res.data.uuid}`;
            // #/video?uuid=DtxGPq0e
          }
        },
        null,
        evt => {
          this.percentComplete = parseInt(100.0 * evt.loaded / evt.total, 10);
        },
      );
    };
    this.$postLink = () => {
      this.upload();
      // eslint-disable-next-line
      this.video = $element.find('video')[0];
      this.div = Array.from($element.find('div')).find(x => {
        // console.log(x);
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
