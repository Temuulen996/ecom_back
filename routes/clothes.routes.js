const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  createClothes,
  findById,

  findNewClothes,
} = require("../controller/clothes.controller");

const router = express.Router();
router.route("/").get(protect, findAll).post(protect, createClothes);
router.route("/new_clothes").get(protect, findNewClothes);
router.route("/:id").get(protect, findById);

module.exports = router;
