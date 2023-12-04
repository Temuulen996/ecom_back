const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user");
const CustomError = require("../utils/errorObject");

//бүх хэрэглэгчийг авах.
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await User.find();
  res.status(200).send({ success: true, data: data });
});
//id-аар хайж олох
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findById(id);
  res.status(200).send({ success: true, data: data });
});
//signup хийх controller.
exports.create = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  //signup хийж буй бүх хэрэглэгч user role-той байна.
  newUser.role = "user";
  const user = await User.create(newUser);
  //хэрэглэгчийн token-ийг үүсгэн өгөх.
  const token = user.getJWT();
  res.status(200).send({ success: true, user: user, token });
});
//login хийх controller.
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //email, password-ийн аль нэг байхгүй бол exception шиднэ.
  if (!email || !password) {
    throw new CustomError(" email nuuts ug damjuuln uu..", 400);
  }
  //хэрэглэгчийг хайж олох хэсэг
  const user = await User.findOne({ email }).select("+password");
  //email-ээр нь user-ийг шүүх үед хэрэглэгч олдохгүй бол exception шиднэ.
  if (!user) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }
  //mongoose-ийн нэг гайхалтай боломж нь schema-даа method бичиж өгч болдог ба энэ боломжийг ашиглан password-ийг шалгах method бичсэн. Түүнийгээ ашиглан password зөв эсэхийг шалгаж буруу бол exception шиднэ.
  const ok = await user.checkPassword(password);
  if (!ok) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }
  //хэрэв бүх шалгалтыг давсан бол JWT буюу хэрэглэгчийн token буцааж өгнө. дараа нь хэрэглэгч энэ token-ийг ашиглан server-ээс data авна.
  const token = user.getJWT();
  res
    .status(200)
    .send({ success: true, login: true, user: user, token: token });
});
