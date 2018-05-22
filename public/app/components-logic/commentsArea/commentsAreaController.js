// eslint-disable-next-line
(function() {
  const moduleName = 'commentsArea';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=' };
  const injection = ['dataService', '$window', '$document', '$element'];

  function controller(dataService, $window, $document, $element) {
    console.log(`${moduleName} started`);

    this.commentsToVideo = [];
    this.commentsToVideoMain = [];

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

    const vm = this;
    this.scroll = {
      get index() {
        return this._index;
      },
      set index(v) {
        if (v > vm.commentsToVideoMain.length) {
          this._index = vm.commentsToVideoMain.length;
        } else {
          this._index = v;
        }
      },
      _index: 0,
    };

    this.loadComments = () =>
      dataService.getCommentsToVideo(this.watchVideo.uuid).then(res => {
        this.commentsToVideoMain = res.data;
        if (this.scroll.index === 0) this.scroll.index = 10;
        return this.commentsToVideoMain;
      });

    this.showComments = () => {
      this.scroll.index += 7;
      this.commentsToVideo = this.commentsToVideoMain.slice(
        0,
        this.scroll.index,
      );
    };

    this.$onInit = () => {
      this.watchVideo.promiseDataReady
        .then(() => this.loadComments())
        .then(() => this.showComments());
    };

    this.$postLink = () => {
      this.commentListDiv = Array.from(
        $element.find('div').find(x => x.matches('.comments-list')),
      );

      angular.element($window).bind('scroll', () => {
        // const bottom = this.top + this.element.clientHeight;
        // const scrollY = $window.pageYOffset + this.windowHeight;
        const bottom = commentListDiv.top + commentListDiv.clientHeight;
        const scrollY = $window.pageYOffset + this.windowHeight;
        // return bottom - scrollY;
        console.log(bottom - scrollY);
        // if ($window.pageYOffset >= 0.9 * $window.innerHeight) {
        //   console.log($window.pageYOffset, $window.innerHeight);
        // }
      });
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

    // const createComment = () => ({

    // "id"
    // "text"
    // "likesCount"
    // "dislikesCount"
    // "postDate"
    // "likeSign"
    // ---
    // userId // who commented
    // userImage // who commented

    //   userName: 'Test user',
    //   userImage: 'images/ava8.png',
    //   userRef: '#/',
    //   text: 'asdfasdfd afd sdf sadf asd',
    //   dateAgo: 'Moth ago',
    //   countLikes: 54,
    //   countDislikes: 23,
    // });
    // this.commentsToVideo = [];
    // i = 15;
    // while (i--) this.commentsToVideo.push(createComment());
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
