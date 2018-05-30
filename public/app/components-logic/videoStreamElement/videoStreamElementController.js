// eslint-disable-next-line
(function() {
  const moduleName = 'videoStreamElement';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  const bindings = { user: '=' };
  const injection = ['$element'];
  function controller($element) {
    let video;

    this.stopStream = () => {
      video.pause();
    };

    this.$postLink = () => {
      video = $element.find('video')[0];
      console.log(video);
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(stream => {
          // console.log(stream);
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
          };
        })
        .catch(err => {
          console.log(err);
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
