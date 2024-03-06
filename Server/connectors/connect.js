const mongoose = require("mongoose");
// require("dotenv").config();

// const connectionString = process.env.MONGODB_URI;

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://taskmanagementapp:6K44gHYX6rpBaKjp@cluster0.wvzjeto.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process on connection failure
  }
};

connection();
module.exports = connection;
