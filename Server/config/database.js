const mongoose = require("mongoose");

exports.connect = () => {
  console.log("MONGO URL:", process.env.MONGODB_URL);

  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((error) => {
      console.log("DB connection failed");
      console.error(error);
      process.exit(1);
    });
};