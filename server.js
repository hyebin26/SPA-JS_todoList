import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import bodyParser from "body-parser";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const __dirname = path.resolve();
const app = express();
const jsonParser = bodyParser.json();
dotenv.config();
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function makeToken(type, uid) {
  let token;
  if (type === "refresh") {
    token = jwt.sign({ id: uid }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } //
  else {
    token = jwt.sign({ id: uid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
  return token;
}
function extractCookie(cookie) {
  const splitCookie = cookie.split(";").map((item) => item.split("="));
  const uid = splitCookie[1][1];
  const access_token = splitCookie[0][1];
  return uid, access_token;
}
app.get("/checkToken", async (req, res) => {
  const cookie = req.headers.cookie.split(";").map((item) => item.split("="));
  const uid = cookie[1][1];
  const access_token = cookie[0][1];
  const check = await checkToken(access_token, uid);
  if (check) {
    res.json(true);
  }
  if (!check) {
    res.json(false);
  }
});
async function checkToken(cookie) {
  console.log(cookie);
  // const splitCookie = cookie.split(";").map((item) => item.split("="));
  // const uid = splitCookie[1][1];
  // const access_token = splitCookie[0][1];
  // try {
  //   const decoded = await jwt.verify(access_token, process.env.JWT_SECRET);
  //   return true;
  // } catch (err) {
  //   if (err.name === "TokenExpiredError") {
  //     let check = true;
  //     conn.query(`select * from tokens where uid="${uid}"`, (err, row) => {
  //       if (err) console.log(err);
  //       if (row[0]) {
  //         let refreshToken = row[0].refresh_token;
  //         try {
  //           jwt.verify(refreshToken, process.env.JWT_SECRET);
  //           check = true;
  //         } catch (err) {
  //           if (err.name === "TokenExpiredError") {
  //             const makedRefresh = makeToken("refresh", uid);
  //             const makedAccess = makeToken("access", uid);
  //             conn.query(
  //               `update tokens set refresh_token="${makedRefresh}" where uid="${uid}"`,
  //               (err, row) => {
  //                 if (err) console.log(err);
  //               }
  //             );
  //             checkToken(makedAccess, uid);
  //             check = true;
  //           } //
  //           if (err.name !== "TokenExpiredError") {
  //             check = false;
  //           }
  //         }
  //       } //
  //     });
  //     return check;
  //   }
  //   // refresh token check
  // 존재하지 않을 경우 => API 호출 불가
  // }
}

app.get("/", (req, res) => {
  res.status(200).sendFile("/index.html");
});
app.get("/signUp", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.get("/main", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});

app.post("/login", async (req, res) => {
  const { uid, pwd } = req.body;
  await conn.query(`select * from tuser where uid="${uid}"`, (err, row) => {
    if (err) {
      res.json(false);
    }
    if (row[0] && pwd === row[0].pwd) {
      let refresh_token = makeToken("refresh", uid);
      let access_token = makeToken("access", uid);
      conn.query(
        `insert into tokens values("${refresh_token}","${uid}")`,
        (err) => {
          if (err) console.log(err);
          console.log(row, "success");
        }
      );
      res.cookie("uid", `${uid}`);
      res.cookie("access_token", `${access_token}`);
      res.json({ access_token });
    } //
    else {
      res.json(false);
    }
  });
});

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
app.post("/signUp/success", (req, res) => {
  const { uid, pwd, uname } = req.body;
  conn.query(
    `insert into tuser values("${uid}","${!pwd ? null : pwd}","${uname}")`,
    (err, row, field) => {
      if (err) {
        console.log(err);
        res.send(false);
      } //
      else res.send(true);
    }
  );
});
app.post("/signUp/social", async (req, res) => {
  const { uid } = req.body;
  const access_token = makeToken("access", uid);
  const refresh_token = makeToken("refresh", uid);
  try {
    await conn.query(`insert into tokens values("${refresh_token}","${uid}")`);
    res.cookie("access_token", `${access_token}`);
    res.cookie("uid", `${uid}`);
    res.json({ access_token });
  } catch (err) {
    console.log(err);
  }
  //토큰이랑 uid 저장해야됨
});

app.post("/collection", async (req, res) => {
  const { uid, collection, color } = req.body.todo;
  console.log(await checkToken(req.headers.cookie), "await");
  console.log(checkToken(req.headers.cookie));
  // if (await checkToken(access_token)) {
  //   conn.query(
  //     `insert into todo values("${uid}","${collection}","${color}","[]","[]",0)`,
  //     (err, row, field) => {
  //       if (err) console.log(err);
  //       res.json(true);
  //     }
  //   );
  // }
  // if (!(await checkToken(access_token))) {
  //   res.json(false);
  // }
});
app.post("/collection/load", async (req, res) => {
  const { uid } = req.body;
  const access_token = req.headers.authorization.split(" ")[1];
  const collectionData = [];
  if (await checkToken(access_token, uid)) {
    conn.query(`select * from todo where uid="${uid}"`, (err, row, field) => {
      if (err) console.log(err);
      row.forEach((item) => {
        collectionData.push({ ...item });
      });
      res.send(collectionData);
    });
  } else {
    res.json(false);
  }
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

app.post("/social/token", async (req, res) => {
  const { token, social } = req.body;
  if (social === "kakao") {
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
      const kakaoToken = await fetchGetToken.json();
      const access_social = await kakaoToken.access_token;
      const fetchNickOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_social}`,
        },
      };
      const getKakaoUser = await fetch(
        "https://kapi.kakao.com/v2/user/me",
        fetchNickOptions
      );
      const kakaoUser = await getKakaoUser.json();
      const { id } = kakaoUser;
      const { nickname } = kakaoUser.properties;
      const access_token = makeToken("access", id);
      const refresh_token = makeToken("refresh", id);
      conn.query(`select * from tuser where uid="${id}"`, (err, row) => {
        if (err) console.log(err);
        if (row.length) {
          res.json({ id, access_token, needSignup: false });
          conn.query(
            `insert into tokens values("${refresh_token}","${id}")`,
            (err, row) => {
              if (err) console.log(err);
            }
          );
        }
        if (!row.length) {
          res.json({ id, nickname, needSignup: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  if (social === "naver") {
    try {
      const fetchNaverToken = await fetch(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${token}`
      );
      const getNaverToken = await fetchNaverToken.json();
      const naverToken = getNaverToken.access_token;
      const getNaverNicknameOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${naverToken}`,
        },
      };
      const getNaverUser = await fetch(
        "https://openapi.naver.com/v1/nid/me",
        getNaverNicknameOptions
      );
      const userData = await getNaverUser.json();
      const { id, nickname } = userData.response;
      const access_token = makeToken("access", id);
      const refresh_token = makeToken("refresh", id);
      conn.query(`select * from tuser where uid="${id}"`, (err, row) => {
        if (err) console.log(err);
        if (row.length) {
          res.json({ id, access_token, needSignup: false });
          conn.query(
            `insert into tokens values("${refresh_token}","${id}")`,
            (err, row) => {
              if (err) console.log(err);
            }
          );
        }
        if (!row.length) {
          res.json({ id, nickname, needSignup: true });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/logout", async (req, res) => {
  const access_token = req.headers.authorization.split(" ")[1];
  const uid = req.body;
  if (await checkToken(access_token, uid)) {
    conn.query(`delete from tokens where uid="${uid}"`, (err, row) => {
      if (err) console.log(err);
      res.send(true);
    });
  } else {
    res.json(false);
  }
});

app.listen(3500, () => {
  console.log("Running");
});

// social/signup test
// app.get("/social/signUp", (req, res) => {
//   console.log(__dirname);
//   res.status(200).sendFile(__dirname + "/public/index.html");
// });
