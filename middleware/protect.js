const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const myError = require("../utils/errorObject");
const User = require("../models/user");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new myError(
      "ene uildliig hiihed tanii erh hurehgui baina ta login hiine uu..",
      400
    );
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new myError("token baihgui baina..", 400);
  }
  const tokenObj = jwt.verify(token, "ECOMMERCE_CLOTHES");

  req.user = await User.findById(tokenObj.id);

  next();
  //   const newUser = req.body;
  //   const user = await User.create(newUser);
  //   const token = user.getJWT();
  //   res.status(200).send({ success: true, user: user, token });
});
