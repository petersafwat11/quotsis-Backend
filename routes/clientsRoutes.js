const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");

router
  .route("/")
  .get(clientsController.getAllClients)
  .post(clientsController.createClients);

router
  .route("/:id")
  .get(clientsController.getClient)
  .patch(clientsController.updateClient)
  .delete(clientsController.deleteClient);

module.exports = router;
