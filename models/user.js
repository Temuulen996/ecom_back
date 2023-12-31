const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Хэрэглэгчийн нэр заавал оруулна уу.."],
  },
  lname: {
    type: String,
    required: [true, "Хэрэглэгчийн овог заавал оруулна уу.."],
  },

  email: {
    type: String,
    required: [true, "Хэрэглэгчийн Email заавал оруулна уу.."],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email хаяг буруу байна.",
    ],
  },
  role: { type: String, required: true, enum: ["user"] },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Хэрэглэгчийн нууц үг заавал оруулна уу.."],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: { type: Date, default: Date.now },
});
//save хийх үед password-ийг encrypt хийх trigger
UserSchema.pre("save", async function () {
  var salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
});
//хэрэглэгчийн token-ийг авах function
UserSchema.methods.getJWT = function () {
  const token = jwt.sign({ id: this._id }, "ECOMMERCE_CLOTHES", {
    expiresIn: "30d",
  });
  return token;
};
//хэрэглэгчийн password-ийг шалгах function
UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
