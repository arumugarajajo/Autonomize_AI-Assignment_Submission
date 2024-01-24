// config/db.js
const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    if (!url) {
      throw new Error("MongoDB connection URL is not provided.");
    }

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
