//! this file has all the routes in.
const express = require("express");
const usersController = require("./../controllers/usersController");

const router = express.Router();

//a middleware that works on parameters
// router.param("id", usersController.checkId);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
router
  .route("/:id")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser)
  .get(usersController.getUser);

module.exports = router;
