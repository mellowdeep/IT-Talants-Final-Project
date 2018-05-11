const express = require("express");

const commentService = require("../services/comment-service");
const status = require("../config/status-code");

const controller = express.Router();


controller.get("/:uuid/comments", (req, res) => {
  // return comment id - commentId,
  // comment text  -  text,
  // comment owner_name  - name  ,
  // comment post date   -  post_date,
  // has i like that comment - like_sign (1 - true), (null-false)
  const userId = req.session.user ? req.session.user.id : 0;
  commentService.getCommentsForVideo(req.params.uuid, userId)
    .then(comments => res.json(comments))
    .catch((err) =>  res.sendStatus(err.statusCode));
});

controller.put("/:uuid/:id/like/:isLike", (req, res) => {
  const isLike = req.params.isLike === 'true' ? 1 : 0;
  const userId = req.session.user ? req.session.user.id : 0;
  commentService.addRemoveLike(req.params.uuid, req.params.id, userId , isLike)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.send(err));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = req.session.user ? req.session.user.id : 0;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => res.json(id))
    .catch((err) =>  res.send(err));
});

controller.delete("/:uuid/delete/:id", (req, res) => {
      const userId = req.session.user ? req.session.user.id : 0;
      commentService.deleteComment(req.params.uuid, req.params.id , userId)
        .then(res.sendStatus(status.OK))
        .catch((err) =>  res.send(err));
});

controller.put("/:uuid/update/:id", (req, res) => {
  const userId = req.session.user ? req.session.user.id : 0;
  commentService.updateComment(req.params.uuid, req.params.id, req.body.text, userId)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.send(err));
});


module.exports = controller;
