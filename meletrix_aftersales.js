const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();

app.use(cors());
app.use(express.json());
const path = "/root/aftersales/meletrix/";

const check_filename = (phone_num, id) => {
  if (
    !fs.existsSync(path + "imgs/" + phone_num + "_" + id + ".jpeg") &&
    !fs.existsSync(path + "imgs/" + phone_num + "_" + id + ".jpg") &&
    !fs.existsSync(path + "imgs/" + phone_num + "_" + id + ".png")
  ) {
    return phone_num + "_" + id;
  }
};

const storage_meletrix = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path + "imgs");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      check_filename(req.body.phone, req.body.id) +
        file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});

const Data_meletrix = multer({ storage: storage_meletrix });

router.post("/", Data_meletrix.any("files"), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: "error",
      message: "Body can not be empty!",
    });
  } else {
    res.status(200).send({ status: "finished" });
  }
});

router.post("/delect", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: "error",
      message: "Body can not be empty!",
    });
  } else {
    const temp_path = path + "imgs/" + req.body.phone + "_" + req.body.id;

    if (fs.existsSync(temp_path + ".jpeg")) {
      fs.unlinkSync(temp_path + ".jpeg");
    }
    if (fs.existsSync(temp_path + ".jpg")) {
      fs.unlinkSync(temp_path + ".jpg");
    }
    if (fs.existsSync(temp_path + ".png")) {
      fs.unlinkSync(temp_path + ".png");
    }
    res.status(200).send({
      message: "Delect success",
    });
  }
  res.end();
});

app.use("/api/aftersales/meletrix", router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to aftersales meletrix." });
});
const options = {
  key: fs.readFileSync("/root/crt/private.key"),
  cert: fs.readFileSync("/root/crt/certificate.crt"),
};
const httpsServer = https.createServer(options, app);

const PORT = process.env.PORT || 9001;

httpsServer.listen(PORT, function () {
  console.log(`http Server is running on port ${PORT}.`);
});
