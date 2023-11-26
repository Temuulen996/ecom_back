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
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
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
  // if (!data) {
  //     throw new myError(`Produc`, 400);
  //   }

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

exports.deleteClothesById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  await Clothes.findByIdAndDelete(id);
  res, status(200).send({ success: true });
});
