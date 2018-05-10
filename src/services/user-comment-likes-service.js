const repository = require('../repositories/user-comment-like-repository');

const status = require("../config/status-code");


const userCommentFunction = {
 addLike: (userId, commentId, likeSign) =>
   repository.addLike(userId, commentId, likeSign)
     .then(id => {
       if(id) return id;
       throw {message:'Comment not found',
         statusCode: status.NOT_FOUND};
     }),
};


module.exports = userCommentFunction;
