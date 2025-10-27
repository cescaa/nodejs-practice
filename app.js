const express = require("express"); // import express

const app = express();
const PORT = 3000;
app.use(express.json()); // middleware; provides .body on req

/*
// define route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side.", app: "nodejs-practice" });
});
*/

const incidentsData = [
  { incident_num: 1, desc: "Mock description..." },
  { incident_num: 2, desc: "Mock description..." },
  { incident_num: 3, desc: "Mock description..." },
];

app.get("/api/v1/incidents", (req, res) => {
  res.status(200).json({
    // send json format standard
    status: "success",
    results: incidentsData.length,
    data: { incidents: incidentsData },
  });
});

app.post("/api/v1/incidents", (req, res) => {
  console.log(req.body);
  res.send("Done");
});

app.get("/api/v1/incidents/:id", (req, res) => {
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
    data: { selectedIncident },
  });
});

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
