const express = require("express"); // import express

const app = express();
const PORT = 3000;
app.use(express.json()); // middleware; provides .body on req

const incidentsData = [
  { incident_num: 1, desc: "Mock description..." },
  { incident_num: 2, desc: "Mock description..." },
  { incident_num: 3, desc: "Mock description..." },
];

const getAllIncidents = (req, res) => {
  res.status(200).json({
    // send json format standard
    status: "success",
    results: incidentsData.length,
    data: { incidents: incidentsData },
  });
};

const createNewIncident = (req, res) => {
  console.log(req.body);
  res.send("Done");
};

const getIncident = (req, res) => {
  console.log(req.params.id);

  const id = req.params.id * 1; // convert to number type
  if (id > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invaid Incident Number" });

  const selectedIncident = incidentsData.find(
    (elem) => elem.incident_num === id
  );
  res.status(200).json({
    status: "success",
    data: { incident: selectedIncident },
  });
};

const updateIncident = (req, res) => {
  if (req.params.id * 1 > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid ID for PATCH" });

  res.status(200).json({
    status: "success",
    data: { incident: "Upated data here..." },
  });
};

const deleteIncident = (req, res) => {
  if (req.params.id * 1 > incidentsData.length)
    return res
      .status(404)
      .json({ status: "fail", message: "Invalid ID for DELETE" });

  res.status(204).json({
    status: "success",
    data: null,
  });
};

/*
app.get("/api/v1/incidents", getAllIncidents);
app.post("/api/v1/incidents", createNewIncident);
app.get("/api/v1/incidents/:id", getIncident);
app.patch("/api/v1/incidents/:id", updateIncident);
app.delete("/api/v1/incidents/:id", deleteIncident);
*/

app.route("/api/v1/incidents").get(getAllIncidents).post(createNewIncident);
app
  .route("/api/v1/incidents/:id")
  .get(getIncident)
  .patch(updateIncident)
  .delete(deleteIncident);

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
