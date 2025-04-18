require("dotenv").config(); // Adicionar esta linha no início
const express = require("express");
const routes = require("./routes");

// Server configuration
const app = express();
const PORT = 3100;

// CORS configuration to allow access from any origin
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Configure routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
