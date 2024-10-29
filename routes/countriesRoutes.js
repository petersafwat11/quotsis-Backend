const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countriesController");

router
  .route("/")
  .get(countriesController.getAllCountries)
  .post(countriesController.createCountries);

router
  .route("/:id")
  .get(countriesController.getCountry)
  .patch(countriesController.updateCountry)
  .delete(countriesController.deleteCountry);

module.exports = router;
