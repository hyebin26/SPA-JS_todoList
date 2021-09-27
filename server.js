const express = require("express");

const app = express();

app.use(express.static(__dirname + "/front"));

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});
app.get("/detail", (req, res) => {
  res.status(200).sendFile(__dirname + "/front/index.html");
});
app.get("/about", (req, res) => {
  res.status(200).sendFile(__dirname + "/front/index.html");
});

app.listen(3500, () => {
  console.log("Running");
});
