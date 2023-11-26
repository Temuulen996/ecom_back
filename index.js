const express = require("express");
const app = express();
var path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var cors = require("cors");
app.use(cors());
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
// const fileupload = require("express-fileupload");
// const uuidv4 = require("uuid");
var bodyParser = require("body-parser");
const asyncHandler = require("./middleware/asyncHandler");
const jwt = require("jsonwebtoken");
//PARSER
app.use(express.json({ limit: "500mb" }));
// app.use(fileupload());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

//Parser

//db connect
connectDb();
//db connect
const User = require("./models/user");
//Routes
const ClothesRoute = require("./routes/clothes.routes");
const UserRoute = require("./routes/user.routes");
const BasketRoute = require("./routes/basket.routes");
//Routes

app.get("/", async (req, res, next) => {
  res.status(200).send({ response: "serverasdasd-тэй амжилттай холбогдлоо." });
});
//
app.get(
  "/check",
  asyncHandler(async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new myError(
        "ene uildliig hiihed tanii erh hurehgui baina ta login hiine uu..",
        401
      );
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new myError("token baihgui baina..", 400);
    }
    const tokenObj = jwt.verify(token, "ECOMMERCE_CLOTHES");

    const user = await User.findById(tokenObj.id);
    if (!user) {
      throw new myError(
        "ene uildliig hiihed tanii erh hurehgui baina ta login hiine uu..",
        401
      );
    }
    res.status(200).send({ success: true, isLogged: true });

    //   const newUser = req.body;
    //   const user = await User.create(newUser);
    //   const token = user.getJWT();
    //   res.status(200).send({ success: true, user: user, token });
  })
);
//middleware
app.use("/api/clothes", ClothesRoute);
app.use("/api/user", UserRoute);
app.use("/api/basket", BasketRoute);
//middleware

//errorHandler
app.use(errorHandler);
//errorHandler
const server = app.listen(3001, () => {
  console.log(`server 3001 port дээр аслаа`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`алдаа гарлаа : ${err.message}`.red.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
