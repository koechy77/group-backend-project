const mongoose = require("mongoose");

const DB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("DB connection successful");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = DB;
