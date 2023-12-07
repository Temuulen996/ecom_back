const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  createClothes,
  findById,

  findNewClothes,
  filterClothes,
} = require("../controller/clothes.controller");

const router = express.Router();
//API-уудыг protect middleware-ээр хамгаалсан байдал
router.route("/").get(protect, findAll).post(protect, createClothes);
router.route("/filter").get(protect, filterClothes);
router.route("/new_clothes").get(protect, findNewClothes);
router.route("/:id").get(protect, findById);

module.exports = router;
