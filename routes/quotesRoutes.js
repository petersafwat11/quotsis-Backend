const express = require("express");
const router = express.Router();
const qoutesController = require("../controllers/qoutesController");

router
  .route("/")
  .get(qoutesController.getAllQuotes)
  .post(qoutesController.createQuotes);

router
  .route("/:id")
  .get(qoutesController.getQuote)
  .patch(qoutesController.updateQuote)
  .delete(qoutesController.deleteQuote);

module.exports = router;
