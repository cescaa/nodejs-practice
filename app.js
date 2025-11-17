const express = require("express"); // import express
const cors = require("cors");
const incidentRouter = require("./routes/incidentRoutes");

const app = express();
app.set('query parser', 'extended'); 
app.use(cors());

app.use(express.json()); // middleware; provides .body on req

app.use("/v1/incidents", incidentRouter);

module.exports = app;
