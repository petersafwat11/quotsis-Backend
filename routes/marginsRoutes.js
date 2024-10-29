const express = require("express");
const router = express.Router();
const marginsController = require("../controllers/marginsController");

router
  .route("/")
  .get(marginsController.getAllMargins) 
  .post(marginsController.createMargin);

router
  .route("/:id")
  .get(marginsController.getMargin) 
  .patch(marginsController.updateMargin)
  .delete(marginsController.deleteMargin); 

module.exports = router;
