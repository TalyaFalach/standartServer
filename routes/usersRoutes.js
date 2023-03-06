//! this file has all the routes in.
const express = require("express");
const usersController = require("./../controllers/usersController");
const authController = require("./../controllers/authController");

const router = express.Router();

//a route only for sign up
//http://localhost:8000/users/signup
router.post("/signup", authController.signup);

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
