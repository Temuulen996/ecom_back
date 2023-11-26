const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  create,
  findByOwnerId,
  inCart,
  remove,
  removeAll,
} = require("../controller/cart.contorller");

const router = express.Router();
router.route("/").get(findAll).post(protect, create);
router.route("/owner").get(protect, findByOwnerId);
router.route("/in_cart/:id").get(protect, inCart);
router.route("/remove").post(protect, remove);
router.route("/remove_all").post(protect, removeAll);
module.exports = router;
