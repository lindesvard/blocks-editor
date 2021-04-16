const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mime = require("mime-to-extensions");

const PORT = 5000;
const app = express();

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + mime.extension(file.mimetype)
    );
  },
});

const upload = multer({ storage });

app.post("/upload/single", upload.single("media"), (req, res) => {
  res.json(`http://localhost:3000/uploads/${req.file.filename}`);
});

app.get("/upload/single", (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(__dirname);
});

app.listen(PORT, () => {
  console.log(`> http://localhost:${PORT}`);
});
