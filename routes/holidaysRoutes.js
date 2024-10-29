const express = require("express");
const router = express.Router();
const holidaysController = require("../controllers/holidaysController");

router
  .route("/")
  .get(holidaysController.getAllHolidays)
  .post(holidaysController.createHoliday);

router
  .route("/:id")
  .get(holidaysController.getHoliday)
  .patch(holidaysController.updateHoliday)
  .delete(holidaysController.deleteHolidays);

module.exports = router;
