// eslint-disable-next-line
(function() {
  const moduleName = 'adminVideoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { user: '=', videoParams: '=', saveChanges: '=' };

  const injection = ['dataService', 'helperService'];
  function controller(dataService, helperService) {
    helperService.log(`${moduleName} started`);

    this.saveChangesButton = () => {
      swal({
        title: 'Approve or block',
        icon: 'warning',
        buttons: { approve: 'Approve', block: 'Block', cancel: 'Cancel' },
      }).then(v => {
        switch (v) {
          case 'approve':
            this.videoParams.approveVideo = 'YES';
            this.saveChanges();
            break;
          case 'block':
            this.videoParams.approveVideo = 'NO';
            this.saveChanges();
            break;
          default:
            break;
        }
      });
    };

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
