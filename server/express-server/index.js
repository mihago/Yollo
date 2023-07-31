const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
app.get("/data/boards", (req, res) => {
  fs.readFile(`./boards.json`, "utf8", function (error, data) {
    if (error) {
      console.log(error);
    } else {
      res.json(JSON.parse(data)); //
    }
  });
});
app.post("/data/boards", bodyParser.json(), (req, res) => {
  fs.writeFile("./boards.json", JSON.stringify(req.body), (error) => {
    console.log(error);
  });
});

app.post("/data", bodyParser.json(), (req, res) => {
  if (req.body.type == "write") {
    fs.writeFile(
      `./data_${req.body.id}.json`,
      JSON.stringify(req.body.data),
      (error) => {
        console.log(error);
      }
    );
  } else {
    fs.stat(`./data_${req.body.id}.json`, (error, status) => {
      if (error) {
        //Файла не существует

        res.json({});
      } else {
        fs.readFile(
          `./data_${req.body.id}.json`,
          "utf8",
          function (error, data) {
            if (error) {
              console.log(error);
            } else {
              res.json(JSON.parse(data)); //
            }
          }
        );
      }
    });
  }
});

app.listen(3333, () => {
  console.log("Application listening on port 3333!");
});
