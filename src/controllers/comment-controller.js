const express = require("express");

const commentService = require("../services/comment-service");
const status = require("../config/status-code");

const NO_USER = 0;
const LIKE = 1;
const DISLIKE = 0;

const controller = express.Router();


controller.get("/:uuid/comments", (req, res) => {
  // return comment id - commentId,
  // comment text  -  text,
  // comment owner_name  - name  ,
  // comment post date   -  post_date,
  // has i like that comment - like_sign (1 - true), (null-false)
  const userId = req.session.user ? req.session.user.id : NO_USER;
  commentService.getCommentsForVideo(req.params.uuid, userId)
    .then(comments => res.json(comments))
    .catch((err) =>  res.status(status.NOT_FOUND).send(err));
});

controller.put("/:uuid/:id/like/:isLike", (req, res) => {
  const isLike = req.params.isLike === 'true' ? LIKE : DISLIKE;
  const userId = req.session.user ? req.session.user.id : NO_USER;
  commentService.addRemoveLike(req.params.uuid, req.params.id, userId , isLike)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = req.session.user ? req.session.user.id : NO_USER;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => res.json(id))
    .catch((err) =>  res.status(status.NOT_FOUND).send(err));
});

controller.delete("/:uuid/delete/:id", (req, res) => {
      const userId = req.session.user ? req.session.user.id : NO_USER;
      commentService.deleteComment(req.params.uuid, req.params.id , userId)
        .then(res.sendStatus(status.OK))
        .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});

controller.put("/:uuid/update/:id", (req, res) => {
  const userId = req.session.user ? req.session.user.id : NO_USER;
  commentService.updateComment(req.params.uuid, req.params.id, req.body.text, userId)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});


module.exports = controller;
