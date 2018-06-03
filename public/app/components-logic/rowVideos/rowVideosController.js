// eslint-disable-next-line
(function() {
  const moduleName = 'rowVideos';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // START MODULE
  // --------------------------------------------------

  const bindings = {
    user: '<',
    initData: '<',
    headTitle: '@',
    playlists: '=',
    initDataReady: '=',
  };
  const injection = ['helperService'];
  function controller(helperService) {
    helperService.log(`${moduleName} started`);

    this.myInterval = 0;
    this.noWrapSlides = false;
    this.active = 0;
    this.sliders = [];
    this.sliderIndex = 0;
    this.sliderDelta = 4;

    this.update = () => {
      this.initDataReady
        .then(() => {
          helperService.log('init data', this.initData);
          this.sliders.length = 0;
          while (this.sliderIndex * this.sliderDelta < this.initData.length) {
            if (
              (this.sliderIndex + 1) * this.sliderDelta >
              this.initData.length
            ) {
              this.sliders.push({
                data: this.initData.slice(
                  this.initData.length - this.sliderDelta >= 0
                    ? this.initData.length - this.sliderDelta
                    : 0,
                  this.initData.length,
                ),
                sliderIndex: this.sliderIndex,
              });
            } else
              this.sliders.push({
                data: this.initData.slice(
                  this.sliderIndex * this.sliderDelta,
                  (this.sliderIndex + 1) * this.sliderDelta,
                ),
                sliderIndex: this.sliderIndex,
              });

            this.sliderIndex += 1;
          } // while
        })
        .then(() => {
          helperService.log(this.sliders);
        });
    };

    this.$postLink = () => {
      this.update();
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
