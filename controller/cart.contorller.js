const Cart = require("../models/cart");
const asyncHandler = require("../middleware/asyncHandler");
const mongoose = require("mongoose");
const CustomError = require("../utils/errorObject");
const user = require("../models/user");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Cart.find();
  res.status(200).send({ success: true, data: data });
});
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Cart.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.findByOwnerId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const data = await Cart.find({ user_id: userId })
    .populate("clothes_id")
    .populate("user_id");

  res.status(200).send({ success: true, data: data });
});
exports.create = asyncHandler(async (req, res, next) => {
  let newItem = req.body;
  newItem.user_id = req.user._id;
  //   newItem.product_id = mongoose.Types.ObjectId(newItem.product_id);

  const cart = await Cart.create(newItem);

  res.status(200).send({ success: true });
});
exports.remove = asyncHandler(async (req, res, next) => {
  let id = req.body.id;
  console.log(req.body);
  console.log(id);

  const cart = await Cart.findByIdAndDelete(id);

  res.status(200).send({ success: true, cart });
});
exports.removeAll = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const count = await Cart.deleteMany({ user_id: req.user._id });
  res.status(200).send({ success: true });
});
exports.inCart = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const count = await Cart.countDocuments({ clothes_id: id });
  if (count == 0) res.status(200).send({ success: true, inCart: false });
  else {
    res.status(200).send({ success: true, inCart: true });
  }
});
