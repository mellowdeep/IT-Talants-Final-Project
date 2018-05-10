const express = require("express");

const commentService = require("../services/comment-service");
const status = require("../config/status-code");

const controller = express.Router();


controller.get("/:uuid/comments", (req, res) => {
  commentService.getCommentsForVideo(req.params.uuid)
    .then(comments => {
      if(comments) {
        res.status(status.OK).json(comments);
      } else {
        res.sendStatus(status.NOT_FOUND);
      }
    })
    .catch(() => res.status(status.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" }));
});


controller.put("/:uuid/add-comment", (req, res) => {
  const commentObj = {};
  commentObj.text = req.body.text;
  commentObj.userId = req.session.user.id;
  commentObj.postDate = new Date().toLocaleDateString();

  commentService.addComment(commentObj, req.params.uuid)
    .then(id => {
      if(id){
        res.status(s);
      } else {
        res.sendStatus(status.NOT_FOUND);
      }
    })
    .catch(() => res.status(status.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" }));
});


module.exports = controller;
