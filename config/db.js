const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://Temuulen:Temuuka123@cluster0.ikgbq1w.mongodb.net/Ecommerce",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log(`db holbogdloo`.cyan.underline.bold);
};
module.exports = connectDB;
