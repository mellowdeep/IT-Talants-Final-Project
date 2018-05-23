const repository = require('../repositories/user-comment-like-repository');

const userCommentFunction = {
  addRate: (userId, commentId, likeSign, dislikeSign) =>
   repository.addRate(userId, commentId, likeSign, dislikeSign)
     .then(id => {
       if(id) return id;
       throw new Error("Comment not found")
     }),
  updateRate: (userId, commentId, likeSign, dislikeSign) =>
    repository.updateRate(userId, commentId, likeSign, dislikeSign)
      .then(id => {
        if (id) return id;
        throw new Error("Comment not found")
      }),
  getLikeByCommentAndUser: (userId, commentId) =>
    repository.findLike(userId, commentId)
      .then(id => id),
};


module.exports = userCommentFunction;
