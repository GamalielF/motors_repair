const express = require("express");
const userController = require("../controllers/users.controller");
const router = express.Router();

router.route("/").get(userController.findUsers).post(userController.createUser);

router
  .route("/:id")
  .patch(userController.updateUser)
  .get(userController.findUser)
  .delete(userController.deleteUser);

module.exports = router;
