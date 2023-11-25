const mongoose = require("mongoose");
const ClothesSchema = mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  is_sold: Boolean,
  created_date: { type: Date, default: Date.now },
  image: String,
});
const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
