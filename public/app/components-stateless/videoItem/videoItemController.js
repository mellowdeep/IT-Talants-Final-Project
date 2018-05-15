// eslint-disable-next-line
(function() {
  const moduleName = 'videoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-stateless/${moduleName}/${moduleName}.html`;
  // templateUrlGenerate(moduleName);
  // '/app/components/head-search/head-search.template.html';
  // START MODULE
  // --------------------------------------------------

  // <video-item image="" href="" time="" title="" views="" like-rate=""></video-item>
  const bindings = {
    videoParams: '<',
    user: '<',
  };

  const injection = ['$element', '$document', '$scope'];
  function controller($element, $document, $scope) {
    console.log(`${moduleName} started`);

    this.mouseOnVideo = false;
    this.mouseOnPlus = false;

    const handlerFunctions = [];

    this.$postLink = () => {
      const elPlus = Array.from($element.find('div')).find(e =>
        e.matches('.plus'),
      );

      const fn = e => {
        const mouseOnVideo = e.path.some(elem => elem === $element[0]);
        const mouseOnPlus = e.path.some(elem => elem === elPlus);

        if (
          this.mouseOnVideo !== mouseOnVideo ||
          (this.mouseOnPlus === false && mouseOnPlus)
        ) {
          $scope.$apply(() => {
            this.mouseOnVideo = mouseOnVideo;
            this.mouseOnPlus = mouseOnPlus;
            if (this.mouseOnVideo === false) {
              this.mouseOnPlus = false;
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
      console.log(`${moduleName} destroy`);
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
