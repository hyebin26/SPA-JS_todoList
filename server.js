import express from "express";
import dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const __dirname = path.resolve();
const app = express();
const jsonParser = bodyParser.json();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});
app.get("/detail", (req, res) => {
  res.redirect("http://localhost:3500");
});
app.get("/about", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.get("/kakao/auth", async (req, res) => {
  await fetch(
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.AUTH_REDIRECT}`
  ).then((data) => res.json({ kakaoAuth: data.url }));
});

app.post("/kakao/token", async (req, res) => {
  const { token } = req.body;
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      redirect: "follow",
    };
    const response = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_API_KEY}&code=${token}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(3500, () => {
  console.log("Running");
});
