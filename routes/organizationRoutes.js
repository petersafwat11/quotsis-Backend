const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

router
  .route("/")
  .get(organizationController.getAllOrganizations)
  .post(organizationController.createOrganization);

router
  .route("/:id")
  .get(organizationController.getOrganization)
  .patch(organizationController.updateOrganization)
  .delete(organizationController.deleteOrganization);

module.exports = router;
