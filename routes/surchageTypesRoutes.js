const express = require("express");
const router = express.Router();
const surchargeTypesController = require("../controllers/surchargeTypesController");

router
  .route("/")
  .get(surchargeTypesController.getAllsurchargeTypes)
  .post(surchargeTypesController.createSurchargeType);

router
  .route("/:id")
  .get(surchargeTypesController.getsurchargeType)
  .patch(surchargeTypesController.updatesurchargeType)
  .delete(surchargeTypesController.deletesurchargeType);

module.exports = router;
