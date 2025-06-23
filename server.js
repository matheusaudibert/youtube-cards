require("dotenv").config();
const express = require("express");
const routes = require("./routes");

// Server configuration
const app = express();
const PORT = 80;

// CORS configuration to allow access from any origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("X-Frame-Options", "ALLOWALL");
  next();
});

// Configure routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
