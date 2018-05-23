// eslint-disable-next-line
(function() {
  const moduleName = 'commentsArea';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const bindings = { watchVideo: '=', user: '=' };
  const injection = [
    'dataService',
    '$window',
    '$document',
    '$element',
    '$q',
    '$timeout',
  ];

  function controller(dataService, $window, $document, $element, $q, $timeout) {
    console.log(`${moduleName} started`);

    this.commentsToVideo = [];
    this.commentsToVideoMain = [];
    this.sortingComments = 'id'; // 'like

    this.popularNewestComments = type => {
      this.sortingComments = type;
      this.watchVideo.promiseDataReady
        .then(() => this.loadComments())
        .then(() => this.showComments(4));
    };

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
      dataService
        .getCommentsToVideo(this.watchVideo.uuid, this.sortingComments)
        .then(res => {
          this.commentsToVideoMain = res.data;
          if (this.scroll.index === 0) this.scroll.index = 4;
          return this.commentsToVideoMain;
        });

    let showCommentFlag = true;
    this.showComments = val => {
      this.scroll.index += val || 0;
      this.commentsToVideo = this.commentsToVideoMain.slice(
        0,
        this.scroll.index,
      );
    };

    this.$onInit = () => {
      this.watchVideo.promiseDataReady
        .then(() => this.loadComments())
        .then(() => {
          this.showComments(4);
          this.haveComments = Boolean(this.commentsToVideo.length);
        });
    };

    this.$postLink = () => {
      this.commentListDiv = Array.from($element.find('div')).find(x =>
        x.matches('.comments-list'),
      );

      // console.log([this.commentListDiv]);

      const bottom =
        this.commentListDiv.offsetTop + this.commentListDiv.clientHeight;

      angular.element($window).bind('scroll', () => {
        if ($window.pageYOffset >= bottom && showCommentFlag) {
          showCommentFlag = false;
          $timeout(() => {
            this.showComments(4);
            showCommentFlag = true;
          }, 700);
        }
      });
    };

    this.userSubmitComment = () => {
      if (!this.user.auth) {
        this.modalParams.showModal = true;
        return;
      }
      let newId;
      dataService
        .addComment({
          uuid: this.watchVideo.uuid,
          text: this.inputByUser,
        })
        .then(res => {
          if (res.status === 200) {
            newId = +res.data;
            return dataService.getCommentsToVideo(this.watchVideo.uuid);
          }
          throw new Error('bad result');
          // console.log('userSubmitComment');
        })
        .then(comments => {
          const elem = comments.data.find(x => x.id === +newId);
          console.log(elem);
          console.log(comments);
          if (elem) {
            this.commentsToVideoMain.unshift(elem);
            this.showComments(1);
            this.haveComments = Boolean(this.commentsToVideo.length);
          }
          // this.showComments(0);
          this.inputByUser = '';
        })
        .catch(e => {
          console.log(e);
        });
    };

    this.listenToAddSubmit = $event => {
      if ($event.ctrlKey && $event.code === 'Enter') {
        this.userSubmitComment();
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
