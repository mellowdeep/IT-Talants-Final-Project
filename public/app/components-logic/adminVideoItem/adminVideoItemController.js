// eslint-disable-next-line
(function() {
  const moduleName = 'adminVideoItem';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { user: '=', videoParams: '=', saveChanges: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);

    this.saveChangesButton = () => {
      swal({
        title: 'Approve or block',
        icon: 'warning',
        buttons: { approve: 'Approve', block: 'Block', cancel: 'Cancel' },
      }).then(v => {
        console.log(v);

        switch (v) {
          case 'approve':
            this.videoParams.approveVideo = 'YES';
            this.saveChanges();
            return;
          case 'block':
            this.videoParams.approveVideo = 'NO';
            this.saveChanges();
            return;
          default:
            return;
        }

        // this.videoParams.approveVideo = 'YES';

        // if (v === 'ok') {
        //   vm.saveChanges().then(() => {
        //     vm.buttonDisable = false;
        //   });
        // } else {
        //   vm.buttonDisable = false;
        // }
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
