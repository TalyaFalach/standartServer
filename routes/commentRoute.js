const express = require("express");
const commentController = require("./../controllers/commentsController");
const router = express.Router();

router.route("/").post(commentController.addComment);

router.route("/:id").get(commentController.getComments)

module.exports = router;
