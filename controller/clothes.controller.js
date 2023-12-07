const asyncHandler = require("../middleware/asyncHandler");
const CustomError = require("../utils/errorObject");
const path = require("path");
const Clothes = require("../models/clothes");

let guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
exports.findAll = asyncHandler(async (req, res, next) => {
  const data = await Clothes.find();
  res.status(200).send({ success: true, data: data });
});
exports.findById = asyncHandler(async (req, res, next) => {
  let id = req.params.id;

  const data = await Clothes.findById(id);

  if (!data) {
    throw new CustomError(`iim id tai buteegdehuun baihgui baina.`, 400);
  }
  const imagePath = path.join(__dirname);

  res.status(200).send({ success: true, data: data });
});
//шинээр хувцасны мэдээлэл db-д оруулах controller. (name ,category, price, description, is_sold, create_date, image)
exports.createClothes = asyncHandler(async (req, res, next) => {
  const newData = req.body;

  // let uniqId = guid();
  // newData.image = `photo_${uniqId}${path.parse(image.name).ext}`;
  newData.is_sold = false;

  // image.mv(
  //   `https://drive.google.com/drive/u/0/folders/1Tdq2mxATK4pRl11ymOiaXt9B_q-OW-t6/${newData.image}`,
  //   (err) => {
  //     console.log(err);
  //   }
  // );
  const clothes = await Clothes.create(newData);
  res.status(200).send({ success: true, clothes: clothes });
});
exports.filterClothes = asyncHandler(async (req, res, next) => {
  let query = {};
  const byString = req.query.by_string;
  const priceFrom = parseFloat(req.query.price_from);
  const priceTo = parseFloat(req.query.price_to);

  if (byString) {
    query.name = new RegExp(byString, "i"); // Case-insensitive match
  }
  if (priceFrom || priceTo) {
    query.price = {};
    if (priceFrom) query.price.$gte = priceFrom;
    if (priceTo) query.price.$lte = priceTo;
  }
  const clothes = await Clothes.find(query);
  res.status(200).send({ success: true, data: clothes });
});
exports.deleteClothesByOwnerId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const data = await Cart.deleteMany({ _id: id }).populate("User");

  res.status(200).send({ success: true, data: data });
});
//хувцасны id-г ашиглан db-ээс хувцсыг устгах contoller.
exports.deleteClothesById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Clothes.findByIdAndDelete(id);
  res.status(200).send({ success: true });
});
//front-ийн home page-дээр харуулах сүүлд нэмэгдсэн хувцаснуудыг авах controller. created_date-ээр нь эрэмбэлэн эхний 6-г авч байна.
exports.findNewClothes = asyncHandler(async (req, res, next) => {
  const data = await Clothes.find({})
    .sort({ created_date: -1 }) // -1 for descending order (most recent first)
    .limit(6);
  console.log(data);
  res.status(200).send({ success: true, data: data });
});
