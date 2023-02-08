const express = require("express");
const router = express.Router();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const mysql = require("mysql2");
const dbConfig = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "010307",
  DB: "aftersales",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
var sql = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,
});

class Aftersales {
  constructor(aftersales) {
    this.order_number = aftersales.order_number;
    this.order_type = aftersales.order_type;
    this.phone_number = aftersales.phone_number;
  }

  static getAll(result) {
    sql.query("SELECT * FROM meletrix", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("meletrix: ", res);
      result(null, res);
    });
  }
  static getListByPhone(phoneNumber, result) {
    sql.query(
      "SELECT * FROM meletrix where phone_number = ?",
      phoneNumber,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        console.log("meletrix: ", res);
        result(null, res);
      }
    );
  }

  static create(newAftersales, result) {
    sql.query(
      `SELECT * FROM meletrix WHERE phone_number = '${newAftersales.phone_number}'`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length != 0) {
          result("未完成", null);
          return;
        }
      }
    );
    sql.query("INSERT INTO meletrix SET ?", newAftersales, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created meletrix: ", { id: res.insertId, ...newAftersales });
      result(null, { id: res.insertId, ...newAftersales });
    });
  }

  static insert(photoName, phoneNumber, result) {
    sql.query(
      `SELECT photo_1 FROM meletrix WHERE phone_number = '${phoneNumber}'`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res[0].photo_1 != "NULL") {
          sql.query(
            `SELECT photo_2 FROM meletrix WHERE phone_number = '${phoneNumber}'`,
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              if (res[0].photo_2 != "NULL") {
                sql.query(
                  `SELECT photo_3 FROM meletrix WHERE phone_number = '${phoneNumber}'`,
                  (err, res) => {
                    if (err) {
                      console.log("error: ", err);
                      result(err, null);
                      return;
                    }
                    if (res[0].photo_3 != "NULL") {
                      result("already have 3 photos", null);
                      return;
                    }
                    sql.query(
                      "UPDATE meletrix SET photo_3 = ?  WHERE phone_number = ?",
                      [photoName, phoneNumber],
                      (err, res) => {
                        if (err) {
                          console.log("error: ", err);
                          result(err, null);
                          return;
                        }

                        console.log("update meletrix: ", {
                          id: res.insertId,
                          photoName,
                        });
                        result(null, { photoName, phoneNumber });
                      }
                    );
                  }
                );

                return;
              }
              sql.query(
                "UPDATE meletrix SET photo_2 = ?  WHERE phone_number = ?",
                [photoName, phoneNumber],
                (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }

                  console.log("update meletrix: ", {
                    id: res.insertId,
                    photoName,
                  });
                  result(null, { photoName, phoneNumber });
                }
              );
            }
          );
          return;
        }
        sql.query(
          "UPDATE meletrix SET photo_1 = ?  WHERE phone_number = ?",
          [photoName, phoneNumber],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }

            console.log("update meletrix: ", {
              id: res.insertId,
              photoName,
            });
            result(null, { photoName, phoneNumber });
          }
        );
      }
    );
  }

  static delete(photoName, phone) {
    var flag = 0;
    sql.query(
      `SELECT * FROM meletrix WHERE phone_number = '${phone}'`,
      (err, res) => {
        if (res[0].photo_1 == photoName) {
          flag = 1;
        } else if (res[0].photo_2 == photoName) {
          flag = 2;
        } else if (res[0].photo_3 == photoName) {
          flag = 3;
        } else {
          flag = 0;
        }
        sql.query(
          "UPDATE meletrix SET photo_" + flag + " = ? where phone_number = ?",
          ["NULL", phone],
          (err, res) => {
            console.log(res);
          }
        );
      }
    );
  }
}

const app = express();

app.use(cors());
app.use(express.json());
const path = "/root/aftersales/meletrix/";

const check_filename = (phone_num, id, end) => {
  if (!fs.existsSync(path + "imgs/" + phone_num + "_" + id + end)) {
    return phone_num + "_" + id + end;
  }
};

const storage_meletrix = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path + "imgs");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      check_filename(
        req.body.phone,
        req.body.id,
        file.originalname.substring(file.originalname.lastIndexOf("."))
      )
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
    const originalFile = req.files[0];
    console.log(originalFile.filename);
    Aftersales.insert(originalFile.filename, req.body.phone);
  }
});
router.get("/", (req, res) => {
  Aftersales.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Notifys.",
      });
    else res.send(data);
  });
});

router.post("/list", (req, res) => {
  Aftersales.getListByPhone(req.body.phone_number, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Notifys.",
      });
    else res.send(data);
  });
});

router.post("/submit", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: "error",
      message: "Body can not be empty!",
    });
  } else {
    const as = new Aftersales({
      order_number: req.body.order_number,
      order_type: req.body.order_type,
      phone_number: req.body.phone_number,
    });
    Aftersales.create(as, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || ":您还有未完成的售后申请",
        });
      else res.status(200).send(data);
    });
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
    const fileName = req.body.phone + "_" + req.body.id;
    if (fs.existsSync(temp_path + ".jpeg")) {
      fs.unlinkSync(temp_path + ".jpeg");
      Aftersales.delete(fileName + ".jpeg", req.body.phone);
    }
    if (fs.existsSync(temp_path + ".jpg")) {
      fs.unlinkSync(temp_path + ".jpg");
      Aftersales.delete(fileName + ".jpg", req.body.phone);
    }
    if (fs.existsSync(temp_path + ".png")) {
      fs.unlinkSync(temp_path + ".png");
      Aftersales.delete(fileName + ".png", req.body.phone);
    }
    res.status(200).send({
      message: "Delect success",
    });
  }
  res.end();
});

app.use("/api/aftersales/meletrix", router);

const options = {
  key: fs.readFileSync("/root/crt/private.key"),
  cert: fs.readFileSync("/root/crt/certificate.crt"),
};
const httpsServer = https.createServer(options, app);

const PORT = process.env.PORT || 9980;

httpsServer.listen(PORT, function () {
  console.log(`http Server is running on port ${PORT}.`);
});
