const express = require("express");
const postsController = require("./../controllers/postsController");
const router = express.Router();

router
  .route("/:id")
  .get(postsController.getPostById);

  module.exports = router;
