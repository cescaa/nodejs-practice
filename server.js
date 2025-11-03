// ENTRY POINT
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" }); // read vars from file

const app = require("./app");

const PORT = process.env.PORT || 3000;

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
