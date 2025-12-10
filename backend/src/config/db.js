const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = `mongodb+srv://test:${process.env.MONGO_PASSWORD}@ebookcreator.4x9r53h.mongodb.net/?appName=eBookCreator`;

  try {
    await mongoose.connect(mongoUrl, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connected to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
