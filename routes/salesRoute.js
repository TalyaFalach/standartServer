const express = require("express");
const salesController = require("./../controllers/salesController");

const router = express.Router();

router
  .route("/")
  .get(salesController.getAllSales)
  .post(salesController.createSale);

// router.route("/:id/like").patch(salesController.addLike);

// router.route("/:id/unlike").patch(salesController.removeLike);

router.route("/:id/all").get(salesController.getAllUserPosts);

router
  .route("/:id")
  .get(salesController.getById)
  .patch(salesController.updateSale)
  .delete(salesController.deleteSale);

module.exports = router;
