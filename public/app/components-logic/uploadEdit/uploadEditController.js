// eslint-disable-next-line
(function() {
  const moduleName = 'uploadEdit';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const injection = ['Upload', '$window'];
  const bindings = { uploadFile: '=' };
  function controller(Upload, $window) {
    this.videoAbout = 'about';
    // ('Lorem, ipsum dolor sit amet consectetur adipisicing elit');
    this.videoTitle = 'Title';
    this.buttonEnable = false;
    // form
    this.fileSize = '';
    this.percentComplete = 0;
    this.isPrivate = 0;
    this.tags = ['music', 'nature', 'news'];
    // from
    this.cancelButton = () => {
      // eslint-disable-next-line
      $window.location.href = '#/';
      // console.log('cancel button');
    };

    this.upload = () => {
      const data = {
        'uploads[]': this.uploadFile.file,
        name: this.videoTitle,
        about: this.videoAbout,
        tag: this.tag,
        visibility: this.isPrivate,
      };
      this.buttonEnable = true;
      return Upload.upload({
        url: '/upload',
        method: 'POST',
        data,
      }).then(
        res => {
          console.log('#/video?uuid=${res.data.uuid}', res);
          if (res.status === 200 && res.data.uuid)
            // eslint-disable-next-line
            $window.location.href = `#/video?uuid=${res.data.uuid}`;
          // #/video?uuid=DtxGPq0e
        },
        null,
        evt => {
          this.percentComplete = parseInt(100.0 * evt.loaded / evt.total, 10);
        },
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
