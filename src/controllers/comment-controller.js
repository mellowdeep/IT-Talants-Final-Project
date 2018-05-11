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
  commentService.getCommentsForVideo(req.params.uuid, req.session.user.id)
    .then(comments => res.json(comments))
    .catch((err) =>  res.sendStatus(err.statusCode));
});

controller.put("/:uuid/:id/like/:isLike", (req, res) => {
  const isLike = req.params.isLike === 'true' ? 1 : 0;
  commentService.addRemoveLike(req.params.uuid, req.params.id, req.session.user.id, isLike)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.sendStatus(err.statusCode));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = req.session.user.id;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => res.json(id))
    .catch((err) =>  res.sendStatus(err.statusCode));
});

controller.delete("/:uuid/delete/:id", (req, res) => {
      const {uuid, id} = req.params;
      const userId = req.session.user.id;
      commentService.deleteComment(uuid, id , userId)
        .then(res.sendStatus(status.OK))
        .catch((err) =>  res.send(err));
});

controller.put("/:uuid/update/:id", (req, res) => {
  const userId = req.session.user.id;
  commentService.updateComment(req.params.uuid, req.params.id, req.body.text, userId)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.send(err));
});


module.exports = controller;
