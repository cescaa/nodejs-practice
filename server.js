// ENTRY POINT
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
//const Incidents = require('./models/incidentModel');

dotenv.config({ path: "./config.env" }); // read vars from file

async function connectDB() {
await mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});
console.log("Connection successful!");
//await Incidents.syncIndexes();                      // create/update indexes to match schema
//console.log("INDEX EXISTS", await Incidents.collection.indexes()); 
}
connectDB();

const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
