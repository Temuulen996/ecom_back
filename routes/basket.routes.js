const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  create,
  findByOwnerId,
} = require("../controller/basket.contorller");

const router = express.Router();
router.route("/").get(findAll).post(protect, create);
router.route("/owner").get(protect, findByOwnerId);

module.exports = router;
