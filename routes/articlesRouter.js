const express = require("express");
const articlesController = require("./../controllers/articlesController");

const router = express.Router();

router
  .route("/")
  .post(articlesController.createArticle)
  .get(articlesController.getAllArticles);

router.route("/:id/all").get(articlesController.getAllUserArticles);
router
  .route("/:id")
  .delete(articlesController.deleteArticle)
  .patch(articlesController.updateArticle);

module.exports = router;
