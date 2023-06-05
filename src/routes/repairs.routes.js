const express = require("express");
const repairController = require("../controllers/repairs.controller");
const router = express.Router();

router
  .route("/")
  .get(repairController.findRepairs)
  .post(repairController.createRepair);

router
  .route("/:id")
  .get(repairController.findRepair)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = router;
