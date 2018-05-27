// eslint-disable-next-line
(function() {
  const moduleName = 'admin';
  // eslint-disable-next-line
  const templateUrl = `/app/pages/${moduleName}/${moduleName}.html`;

  // START MODULE
  // --------------------------------------------------
  const bindings = { user: '=', videosToApprove: '=' };
  const injection = ['adminService', '$q'];
  function controller(adminService, $q) {
    console.log(`${moduleName} started`);
    this.buttonDisable = false;

    this.checkedFilter = false;

    this.videosToApproveAfter = [];
    this.videoSearchText = '';
    const vm = this;

    this.filter = () => {
      this.videosToApproveAfter = this.videosToApprove.filter(
        video =>
          video.name
            .toUpperCase()
            .indexOf(this.videoSearchText.toUpperCase()) !== -1 &&
          ((this.checkedFilter && video.approveVideo !== '') ||
            !this.checkedFilter),
      );
    };

    this.filterChecked = () => {
      this.checkedFilter = !this.checkedFilter;

      this.filter();
    };

    this.$postLink = () => {
      this.videosToApproveAfter = this.videosToApprove;
    };

    this.inputSearch = () => {
      this.filter();
    };

    this.modal = {
      get accept() {
        return this._value;
      },
      set accept(v) {
        this.showModal = false;
        if (v) {
          vm.saveChanges().then(() => {
            vm.buttonDisable = false;
          });
        } else {
          vm.buttonDisable = false;
        }
      },
      _value: false,
      showModal: false,
      hideNo: false,
      text: 'Save changes?',
      textYes: 'Ok',
      textNo: 'Cancel',
    };

    this.saveChangesButton = () => {
      this.buttonDisable = true;
      this.modal.showModal = true;
    };

    this.saveChanges = () => {
      const data = this.videosToApprove
        .filter(video => video.approveVideo !== '')
        .map(video => {
          let videoPromise;
          if (video.approveVideo === 'YES') {
            videoPromise = adminService.approveVideoId(video.id);
          }
          if (video.approveVideo === 'NO') {
            videoPromise = adminService.blockVideoId(video.id);
          }
          return videoPromise;
        });

      return $q
        .all(data)
        .then(() => {
          this.videosToApprove.length = 0;
          return adminService.getVideosToApprove();
        })
        .then(res => {
          if (res && Array.isArray(res.data)) {
            this.videosToApprove = [...res.data];
            this.filter();
          }
          this.buttonDisable = false;
        });
    };

    // setTimeout(() => console.log(this.videosToApprove), 2000);
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
