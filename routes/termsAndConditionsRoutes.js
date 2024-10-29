const express = require("express");
const router = express.Router();
const termsAndConditionsController = require("../controllers/termsAndConditionsController");

router
  .route("/")
  .get(termsAndConditionsController.getAllTerms)
  .post(termsAndConditionsController.createTerms);

router
  .route("/:id")
  .get(termsAndConditionsController.getTerms)
  .patch(termsAndConditionsController.updateTerms)
  .delete(termsAndConditionsController.deleteTerms);

module.exports = router;
