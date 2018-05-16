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
    this.videoTitle = 'Title asdfasdf';
    // form
    this.fileSize = '130 MB';
    this.percentComplete = 10;
    this.isPrivate = 0;
    this.tags = ['music', 'nature', 'news'];
    // from
    this.cancelButton = () => {
      $window.location.href = '#/';
      // console.log('cancel button');
    };

    this.upload = () => {
      const data = {
        'uploads[]': this.uploadFile.file,
        name: this.videoTitle,
        about: this.videoAbout,
        tag: this.tag,
        status: this.isPrivate,
      };

      return Upload.upload({
        url: '/upload',
        method: 'POST',
        data,
      }).then(
        resp => {
          // $window.location.href = '#/';
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
  // eslint-disable-next-line
})();
