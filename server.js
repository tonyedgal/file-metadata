require("dotenv").config();

var express = require("express");
var cors = require("cors");
const multer = require("multer");
var app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", multer().single("upfile"), (req, res) => {
  let responseObject = {};

  responseObject["name"] = req.file.originalname;
  responseObject["type"] = req.file.mimetype;
  responseObject["size"] = req.file.size;

  res.json(responseObject);
});

const listener = app.listen(port, () => {
  console.log(listener.address());
});
