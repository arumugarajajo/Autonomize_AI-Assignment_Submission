const express = require("express");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();

// Connect to MongoDB using the environment variable
connectDB(process.env.MONGODB_URL);

// Middleware
app.use(express.json());

// Define routes
app.use("/api/users", require("./routes/users"));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
