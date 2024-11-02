const express = require("express");
const router = express.Router();
const chargesController = require("../controllers/chargesController");
router
  .route("/termsAndConditions")
  .get(chargesController.getAllTerms)
  .post(chargesController.createTerm);

router
  .route("/termsAndConditions/:id")
  .get(chargesController.getTerm)
  .patch(chargesController.updateTerm)
  .delete(chargesController.deleteTerm);

router
  .route("/")
  .get(chargesController.getAllCharges)
  .post(chargesController.createCharge);

router
  .route("/:id")
  .get(chargesController.getCharge)
  .patch(chargesController.updateCharge)
  .delete(chargesController.deleteCharge);
module.exports = router;
