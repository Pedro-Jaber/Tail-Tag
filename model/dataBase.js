const mongoose = require("mongoose");

// Connect to DB
module.exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    return { status: "OK", conn: conn };
  } catch (error) {
    return { status: "ERROR", error: error };
  }
};
