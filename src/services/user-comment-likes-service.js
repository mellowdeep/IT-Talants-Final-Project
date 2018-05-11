const repository = require('../repositories/user-comment-like-repository');

const userCommentFunction = {
 addLike: (userId, commentId, likeSign) =>
   repository.addLike(userId, commentId, likeSign)
     .then(id => {
       if(id) return id;
       throw new Error("Comment not found")
     }),
  updateLike: (userId, commentId, likeSign) =>
    repository.updateLike(userId, commentId, likeSign)
      .then(id => {
        if (id) return id;
        throw new Error("Comment not found")
      }),
  getLikeByCommentAndUser: (userId, commentId) =>
    repository.findLike(userId, commentId)
      .then(id => id),
};


module.exports = userCommentFunction;
