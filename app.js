const express = require("express"); // import express

const app = express();
const PORT = 3000;

/*
// define route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the server side.", app: "nodejs-practice" });
});
*/

const incidentsData = [{ incident_num: 1, desc: "Mock description..." }];

app.get("/api/v1/incidents", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      results: incidentsData.length,
      data: { incidents: incidentsData },
    });
});

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
