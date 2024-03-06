const express = require("express");
const app = express();
require("./connectors/connect");

const authRoutes = require("./routes/auth");
const listAuthRoutes = require("./routes/listauth");

// Middleware to parse JSON in request bodies
app.use(express.json());

// Hello route for testing
app.get("/", (req, res) => {
  res.send("Hello");
});

// API routes
app.use("/api/v1", authRoutes);
app.use("/api/v2", listAuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = 1000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
