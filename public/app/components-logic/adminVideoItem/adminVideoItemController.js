// eslint-disable-next-line
(function() {
  const moduleName = 'adminVideoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', videoParams: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);

    this.approve = val => {
      const status = this.videoParams.approveVideo;
      if (val && status === '') {
        this.videoParams.approveVideo = 'YES';
      }
      if (val && status === 'NO') {
        this.videoParams.approveVideo = 'YES';
      }
      if (val && status === 'YES') {
        this.videoParams.approveVideo = '';
      }
      if (!val && status === '') {
        this.videoParams.approveVideo = 'NO';
      }
      if (!val && status === 'YES') {
        this.videoParams.approveVideo = 'NO';
      }
      if (!val && status === 'NO') {
        this.videoParams.approveVideo = '';
      }
    };
  }

  // --------------------------------------------------
  // LOAD component
  // eslint-disable-next-line
  angular.module('app').component(moduleName, {
    templateUrl,
    controller: [...injection, controller],
    bindings,
  });
  // END module
})();
