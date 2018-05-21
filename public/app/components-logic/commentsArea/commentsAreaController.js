// eslint-disable-next-line
(function() {
  const moduleName = 'commentsArea';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=' };
  const injection = ['dataService'];

  function controller(dataService) {
    console.log(`${moduleName} started`);

    this.inputByUser = '';
    this.modalParams = {
      hideNo: true,
      text: 'Please login',
      showModal: false,
      get accept() {
        return this._value;
      },
      set accept(v) {
        this.showModal = false;
      },
      _value: false,
    };

    this.userSubmitComment = () => {
      if (!this.user.auth) {
        this.modalParams.showModal = true;
        return;
      }

      dataService
        .addComment({
          uuid: this.watchVideo.uuid,
          text: this.inputByUser,
        })
        .then(res => console.log(res));
      console.log('userSubmitComment');
    };

    const createComment = () => ({
      userName: 'Test user',
      userImage: 'images/ava8.png',
      userRef: '#/',
      text: 'asdfasdfd afd sdf sadf asd',
      dateAgo: 'Moth ago',
      countLikes: 54,
      countDislikes: 23,
    });
    this.commentsToVideo = [];
    i = 15;
    while (i--) this.commentsToVideo.push(createComment());
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
