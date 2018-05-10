const express = require("express");

const commentService = require("../services/comment-service");
const status = require("../config/status-code");

const controller = express.Router();


controller.get("/:uuid/comments", (req, res) => {
  commentService.getCommentsForVideo(req.params.uuid)
    .then(comments => res.status(status.OK).json(comments))
    .catch((err) =>  res.sendStatus(err.statusCode).json({ error: err.message }));
});

controller.put("/:uuid/:id/like", (req, res) => {
  commentService.addLike(req.params.uuid, req.params.id, req.session.user.id)
    .then(res.status(status.OK))
    .catch((err) =>  res.sendStatus(err.statusCode).json({ error: err.message }));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = req.session.user.id;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => res.status(status.OK).json(id))
    .catch((err) =>  res.sendStatus(err.statusCode).json({ error: err.message }));
});

controller.delete("/:uuid/delete/:id", (req, res) => {
      const {uuid, id} = req.params;
      const userId = req.session.user.id;
      commentService.deleteComment(uuid, id, userId)
        .then(res.status(status.OK))
        .catch((err) =>  res.sendStatus(err.statusCode).json({ error: err.message }));
});

controller.update("/:uuid/update/:id", (req, res) => {
  const {uuid, id, text} = req.params;
  const userId = req.session.user.id;
  commentService.updateComment(uuid, id, text, userId)
    .then(res.status(status.OK))
    .catch((err) =>  res.sendStatus(err.statusCode).json({ error: err.message }));
});


module.exports = controller;
