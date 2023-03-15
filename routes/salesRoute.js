const express = require("express");
const salesController = require("./../controllers/salesController");

const router = express.Router();

router
  .route("/")
  .get(salesController.getAllSales)
  .post(salesController.createSale);

router.route('/:id')
.get(salesController.getById).patch(salesController.updateSale).delete(salesController.deleteSale)

module.exports = router;
