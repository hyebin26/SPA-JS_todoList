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

app.get("/naver/auth", async (req, res) => {
  try {
    const fetchNaverAuth = await fetch(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.AUTH_REDIRECT}&state=${process.env.NAVER_CLIENT_SECRET}`
    );
    const naverAuthURL = fetchNaverAuth.url;
    res.json({ naverAuthURL });
  } catch (err) {
    console.log(err);
  }
});

app.get("/kakao/auth", async (req, res) => {
  try {
    const fetchKakaoAuth = await fetch(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_API_KEY}&redirect_uri=${process.env.AUTH_REDIRECT}`
    );
    const kakaoAuthURL = await fetchKakaoAuth.url;
    res.json({ kakaoAuthURL });
  } catch (err) {
    console.log(err);
  }
});

app.post("/kakao/token", async (req, res) => {
  const { token } = req.body;
  try {
    const getTokenOptions = {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      redirect: "follow",
    };
    const fetchGetToken = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_API_KEY}&code=${token}`,
      getTokenOptions
    );
    const { access_token } = await fetchGetToken.json();
    const fetchNickOptions = {
      method: "POST",
      headers: {
        "Content-type": " application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    };
    const getNickname = await fetch(
      "https://kapi.kakao.com/v2/user/me",
      fetchNickOptions
    );
    console.log("wht!!");
    const userData = await getNickname.json();
    const { nickname } = await userData.properties;
    res.send({ nickname });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3500, () => {
  console.log("Running");
});
