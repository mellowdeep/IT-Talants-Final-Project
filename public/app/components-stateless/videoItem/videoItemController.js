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
    this.mouseOnPlayLists = false;

    this.clickOnPlus = () => {
      this.mouseOnPlus = !this.mouseOnPlus;
    };

    const handlerFunctions = [];

    this.$postLink = () => {
      const elPlus = Array.from($element.find('div')).find(e =>
        e.matches('.plus'),
      );

      const ulPlayLists = Array.from($element.find('li')).find(
        e => e.attributes.name && e.attributes.name.value === 'playlists',
      );

      const fn = e => {
        const mouseOnVideo = e.path.some(elem => elem === $element[0]);
        const mouseOnPlus = e.path.some(elem => elem === elPlus);
        const mouseOnPlayLists = e.path.some(elem => elem === ulPlayLists);

        if (
          this.mouseOnVideo !== mouseOnVideo ||
          this.mouseOnPlayLists !== mouseOnPlayLists
        ) {
          $scope.$apply(() => {
            this.mouseOnVideo = mouseOnVideo || mouseOnPlayLists || mouseOnPlus;
            this.mouseOnPlus =
              this.mouseOnPlus === true || mouseOnPlus || mouseOnPlayLists;
            this.mouseOnPlayLists = mouseOnPlayLists;
            if (this.mouseOnVideo === false) {
              this.mouseOnPlus = false;
              this.mouseOnPlayLists = false;
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