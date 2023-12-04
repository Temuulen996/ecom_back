const express = require("express");
const { protect } = require("../middleware/protect");
const {
  findAll,
  findById,
  create,
  login,
} = require("../controller/user.controller");

const router = express.Router();
//API-уудыг protect middleware-ээр хамгаалсан байдал
router.route("/").get(findAll).post(create);
router.route("/:id").get(findById);
router.route("/login").post(login);

module.exports = router;
