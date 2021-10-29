import express from "express";
import dotenv from "dotenv";
import path from "path";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import mysql from "mysql";

const __dirname = path.resolve();
const app = express();
const jsonParser = bodyParser.json();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/src"));
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@@da8611zi",
  database: "todolist",
});

// conn.query("SELECT * from tuser", (error, rows, fields) => {
//   if (error) throw error;
//   console.log("User info is: ", rows);
// });

app.post("/signUp/check", (req, res) => {
  const { check, category } = req.body;
  conn.query(
    `select * from tuser where ${category}="${check}"`,
    (err, row, fields) => {
      if (err) console.log(err);
      if (row.length) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});

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
app.post("/signUp/success", (req, res) => {
  const { uid, pwd, uname } = req.body.user;
  conn.query(
    `insert into tuser values("${uid}","${pwd}","${uname}")`,
    (err, row, field) => {
      if (err) {
        console.log(err);
        res.send(false);
      }
      res.send(true);
    }
  );
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
    const userData = await getNickname.json();
    const { nickname } = await userData.properties;
    res.send({ nickname });
  } catch (err) {
    console.log(err);
  }
});

app.post("/naver/token", async (req, res) => {
  const { token } = req.body;
  try {
    const fetchNaverToken = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${token}`
    );
    const { access_token } = await fetchNaverToken.json();
    const getNaverNicknameOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const getNaverNickname = await fetch(
      "https://openapi.naver.com/v1/nid/me",
      getNaverNicknameOptions
    );
    const userData = await getNaverNickname.json();
    const { nickname } = userData.response;
    res.send({ nickname });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3500, () => {
  console.log("Running");
});
