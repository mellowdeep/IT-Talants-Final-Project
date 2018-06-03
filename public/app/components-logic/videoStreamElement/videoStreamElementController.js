// eslint-disable-next-line
(function() {
  const moduleName = 'videoStreamElement';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '=' };
  const injection = ['$element', 'helperService'];
  function controller($element, helperService) {
    helperService.log(`${moduleName} started`);

    let video;

    this.stopStream = () => {
      video.pause();
    };

    this.$postLink = () => {
      // eslint-disable-next-line prefer-destructuring
      video = $element.find('video')[0];
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(stream => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
          };
        })
        .catch(err => {
          helperService.log(err);
        });
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
