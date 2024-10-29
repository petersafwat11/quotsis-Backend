const express = require("express");
const router = express.Router();
const ratesController = require("../controllers/ratesController");

router
  .route("/")
  .get(ratesController.getAllRates)
  .post(ratesController.createRates);

router
  .route("/:id")
  .get(ratesController.getRates)
  .patch(ratesController.updateRates)
  .delete(ratesController.deleteRates);

module.exports = router;
