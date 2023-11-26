const mongoose = require("mongoose");
const ClothesSchema = mongoose.Schema({
  name: { type: String, required: [true, "хувцасны нэр заавал оруулна уу.."] },
  category: {
    type: String,
    required: [true, "хувцасны төрөл заавал оруулна уу.."],
  },
  price: { type: Number, required: [true, "хувцасны үнэ заавал оруулна уу.."] },
  description: {
    type: String,
    required: [true, "хувцасны тайлбар заавал оруулна уу.."],
  },
  is_sold: Boolean,
  created_date: { type: Date, default: Date.now },
  image: {
    type: String,
    required: [true, "хувцасны зураг заавал оруулна уу.."],
  },
});
const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
