const express = require("express");
const app = express();

//Routes

app.get("/", async (req, res, next) => {
  res.status(200).send({ response: "server-тэй амжилттай холбогдлоо." });
});

//middleware

const server = app.listen(3000, () => {
  console.log(`server 3001 port дээр аслаа`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`алдаа гарлаа : ${err.message}`.red.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
