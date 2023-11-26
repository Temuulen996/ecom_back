const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user");

const CustomError = require("../utils/errorObject");
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await User.find();
  res.status(200).send({ success: true, data: data });
});
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.create = asyncHandler(async (req, res, next) => {
  const newUser = req.body;

  const user = await User.create(newUser);
  const token = user.getJWT();
  res.status(200).send({ success: true, user: user, token });
});
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError(" email nuuts ug damjuuln uu..", 400);
  }
  //хэрэглэгчийг хайж олох хэсэг
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }
  const ok = await user.checkPassword(password);
  if (!ok) {
    throw new CustomError("email nuuts ugiin ali neg buruu baina..", 400);
  }

  const token = user.getJWT();
  res
    .status(200)
    .send({ success: true, login: true, user: user, token: token });
});
