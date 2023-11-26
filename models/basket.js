const mongoose = require("mongoose");
const BasketSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
  clothes_id: { type: mongoose.Schema.ObjectId, ref: "Clothes" },
  created_date: { type: Date, default: Date.now },
});
const Basket = mongoose.model("Basket", BasketSchema);
module.exports = Basket;
