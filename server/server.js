const express = require("express");
var cors = require("cors");

const path = require("path");
const port = process.env.PORT || 8081;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/ping", function (req, res) {
  return res.send("pong");
});

const index = path.join(__dirname, "..", "build", "/index.html");

app.use(cors());

app.get("/*", function (req, res) {
  res.sendFile(index);
});

app.listen(port);
console.log(
  `Server started on port=${port} environment=${(ENV =
    process.env.NODE_ENV != null ? process.env.NODE_ENV : "development")}.`
);
