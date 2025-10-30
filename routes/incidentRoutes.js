const express = require("express");
const incidentController = require("./../controllers/incidentController");
const router = express.Router();

router
  .route("/")
  .get(incidentController.getAllIncidents)
  .post(incidentController.createNewIncident);
router
  .route("/:id")
  .get(incidentController.getIncident)
  .patch(incidentController.updateIncident)
  .delete(incidentController.deleteIncident);

//app.use("/api/v1/incidents", router);

module.exports = router;
