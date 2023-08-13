const mongoose = require("mongoose");
const { MONGO_URI } = require("../services/environment.service");

async function connectDatabase() {
  try {
    await mongoose.connect(
      MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    
    throw error;
  }
}

module.exports = { connectDatabase };
