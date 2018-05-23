// eslint-disable-next-line
(function() {
  const moduleName = 'comment';
  // eslint-disable-next-line
  const templateUrl = `/app/components-logic/${moduleName}/${moduleName}.html`;
  // --------------------------------------------------
  const injection = ['dataService'];
  const bindings = { commentParams: '=', user: '=', watchVideo: '=' };

  function controller(dataService) {
    console.log(`${moduleName} started`);
    this.canLike = true;

    this.likeComment = type => {
      console.log('click like');
      this.canLike = false;

      console.log(this.commentParams);
      dataService
        .setCommentLike({
          uuid: this.watchVideo.uuid,
          commentId: this.commentParams.id,
          type,
          likeSign: this.commentParams.likeSign || 0,
          dislikeSign: this.commentParams.dislikeSign || 0,
        })
        .then(res => {
          if (res.status === 200) {
            return dataService.getCommentsToVideo(this.watchVideo.uuid);
          }
          this.canLike = true;
          throw new Error('cannot set like');
        })
        .then(({ data }) => {
          const {
            likeSign,
            dislikeSign,
            likesCount,
            dislikesCount,
          } = data.find(x => x.id === this.commentParams.id);
          this.commentParams.likeSign = likeSign;
          this.commentParams.dislikeSign = dislikeSign;
          this.commentParams.likesCount = likesCount;
          this.commentParams.dislikesCount = dislikesCount;
          this.canLike = true;
        })
        .catch(err => {
          console.log(err);
        });
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
