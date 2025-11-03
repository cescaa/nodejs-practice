const express = require("express"); // import express
const incidentRouter = require("./routes/incidentRoutes");

const app = express();

app.use(express.json()); // middleware; provides .body on req

app.use("/api/v1/incidents", incidentRouter);

module.exports = app;
