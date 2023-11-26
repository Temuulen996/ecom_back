const Basket = require("../models/basket");
const asyncHandler = require("../middleware/asyncHandler");
const mongoose = require("mongoose");
const CustomError = require("../utils/errorObject");

exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Basket.find();
  res.status(200).send({ success: true, data: data });
});
exports.findById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Basket.findById(id);
  res.status(200).send({ success: true, data: data });
});
exports.findByOwnerId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;
  const data = await Basket.find({ user_id: userId })
    .populate("clothes_id")
    .populate("user_id");

  res.status(200).send({ success: true, data: data });
});
exports.create = asyncHandler(async (req, res, next) => {
  let newItem = req.body;
  newItem.user_id = req.user._id;
  //   newItem.product_id = mongoose.Types.ObjectId(newItem.product_id);

  const basket = await Basket.create(newItem);

  res.status(200).send({ success: true });
});
