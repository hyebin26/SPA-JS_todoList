const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});
app.get("/detail", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});
app.get("/about", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.listen(3500, () => {
  console.log("Running");
});
