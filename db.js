const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://mentorguvi:AsG5HtQYGlXeB4m4@cluster0.adwweay.mongodb.net/DineIn";

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri);
  console.log(mongoose.connection.readyState, " --- Connection State");
};

module.exports = {
  connectDb,
  mongoose,
};
