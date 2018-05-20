const express = require("express");

const commentService = require("../services/comment-service");
const status = require("../config/status-code");

const NO_USER = 0;
const ADD = 1;
const REMOVE = 0;

const controller = express.Router();


controller.get("/:uuid/comments", (req, res) => {
  // return comment id - commentId,
  // comment text  -  text,
  // comment owner_name  - name  ,
  // comment post date   -  post_date,
  // has i like that comment - like_sign (1 - true), (null-false)
  const userId = req.user ? req.user.id : NO_USER;
  commentService.getCommentsForVideo(req.params.uuid, userId)
    .then(comments => res.send(comments))
    .catch((err) =>  res.status(status.NOT_FOUND).send(err));
});

controller.put("/:uuid/:commentId/like/:isLike", (req, res) => {
  const loggedUser = req.user;
  if(!loggedUser){
    res.status(status.UNAUTHORIZED).send("User not found");
    return;
  }

  let {isLike} = req.params;
  if(isLike.toLowerCase() !== true.toString() && isLike.toLowerCase() !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isLike = isLike.toLowerCase() ===  true.toString() ? ADD : REMOVE;
  const userId = loggedUser.id;
  commentService.addRemoveLike(req.params.uuid, req.params.commentId, userId , isLike)
    .then(() => res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});

controller.put("/:uuid/:commentId/dislike/:isDislike", (req, res) => {
  const loggedUser = req.user;
  if(!loggedUser){
    res.status(status.UNAUTHORIZED).send("User not found");
    return;
  }

  let {isDislike} = req.params;
  if(isDislike.toLowerCase() !== true.toString() && isDislike.toLowerCase() !== false.toString()){
    res.status(status.BAD_REQUEST).send("Invalid command");
    return;
  }

  isDislike = isDislike.toLowerCase() ===  true.toString() ? ADD : REMOVE;
  const userId = loggedUser.id;
  commentService.addRemoveDislike(req.params.uuid, req.params.commentId, userId , isDislike)
    .then(() => res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const loggedUser = req.user;
  if(!loggedUser){
    res.status(status.UNAUTHORIZED).send("User not found");
    return;
  }

  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = loggedUser.id;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => res.json(id))
    .catch((err) =>  res.status(status.NOT_FOUND).send(err));
});

controller.delete("/:uuid/delete/:commentId", (req, res) => {
    const loggedUser = req.user;
    if(!loggedUser){
      res.status(status.UNAUTHORIZED).send("User not found");
      return;
    }

    const userId = loggedUser.id;
    commentService.deleteComment(req.params.uuid, req.params.commentId , userId)
      .then(res.sendStatus(status.OK))
      .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});

controller.put("/:uuid/update/:commentId", (req, res) => {
  const loggedUser = req.user;
  if(!loggedUser){
    res.status(status.UNAUTHORIZED).send("User not found");
    return;
  }

  const userId = loggedUser.id;
  commentService.updateComment(req.params.uuid, req.params.commentId, req.body.text, userId)
    .then(res.sendStatus(status.OK))
    .catch((err) =>  res.status(status.BAD_REQUEST).send(err));
});


module.exports = controller;
