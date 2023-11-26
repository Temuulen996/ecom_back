const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  clothes_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Clothes",
    required: true,
  },
  created_date: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
