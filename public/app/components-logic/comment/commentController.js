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
    this.likeComment = val => {
      console.log('click like');
      this.canLike = false;
      if (this.commentParams.likeSign === val) {
        dataService
          .setCommentLike({
            uuid: this.watchVideo.uuid,
            commentId: this.commentParams.id,
            type: 0,
          })
          .then(res => {
            if (res.status === 200) {
              this.commentParams.likeSign = 0;
            }
            this.canLike = true;
          });
      } else {
        dataService
          .setCommentLike({
            uuid: this.watchVideo.uuid,
            commentId: this.commentParams.id,
            type: val,
          })
          .then(res => {
            if (res.status === 200) {
              this.commentParams.likeSign = val;
            }
            this.canLike = true;
          });
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
