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

const conn = mysql.createPool({
  host: process.env.DB_HOST,
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

function checkToken(cookie) {
  const splitCookie = cookie.split(";").map((item) => item.trim().split("="));
  let uid = "";
  let access_token = "";
  splitCookie.forEach((item) => {
    if (item[0] === "uid") {
      uid = item[1];
    }
    if (item[0] === "access_token") {
      access_token = item[1];
    }
  });
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    return "success";
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return "expiredError";
    }
    return "error";
  }
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
app.get("/collection/:collectionId", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/index.html");
});
app.delete("/collection/:collectionId", (req, res) => {
  const collectionDeleteToken = checkToken(req.headers.cookie);
  const collectionId = req.params.collectionId;
  if (
    collectionDeleteToken === "success" ||
    collectionDeleteToken === "expiredError"
  ) {
    if (collectionDeleteToken === "expiredError") {
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(
      `delete from todo where collectionId=${collectionId}`,
      (err, row) => {
        if (err) {
          console.log(err);
          res.status(404);
        }
        res.send(true);
      }
    );
  }
  if (collectionDeleteToken === "error") {
    res.status(401).send(false);
  }
});
app.get("/collection/collectionId/:collectionId", (req, res) => {
  const collectionIdCheckToken = checkToken(req.headers.cookie);
  const collectionId = req.params.collectionId;
  if (
    collectionIdCheckToken === "success" ||
    collectionIdCheckToken === "expiredError"
  ) {
    if (collectionIdCheckToken === "expiredError") {
      const { uid } = req.cookies;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(
      `select * from tasks where collectionId="${collectionId}"`,
      (err, row) => {
        const tasks = row;
        try {
          conn.query(
            `select * from done where collectionId="${collectionId}"`,
            (err2, row2) => {
              if (err2) console.log(err2);
              const done = row2;
              conn.query(
                `select collection from todo where collectionId=${collectionId}`,
                (err3, row3) => {
                  if (err3) console.log(err3);
                  const title = row3[0].collection;
                  res.json({ tasks, done, title });
                }
              );
            }
          );
        } catch {
          console.log(err);
          res.status(404).send(false);
        }
      }
    );
  }

  if (collectionIdCheckToken === "error") {
    res.status(401).send("unauthenticated");
  }
});

app.post("/collection/tasks/:collectionId", (req, res) => {
  const collectionPostToken = checkToken(req.headers.cookie);
  const content = req.body.content;
  const collectionId = req.params.collectionId;
  const doneId = req.body.doneId;
  if (
    collectionPostToken === "success" ||
    collectionPostToken === "expiredError"
  ) {
    if (collectionPostToken === "expiredError") {
      const { uid } = req.cookies;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    if (!doneId) {
      conn.query(
        `insert into tasks values(0,"${content}","${collectionId}")`,
        (err, row) => {
          if (err) console.log(err);
          res.send(true);
        }
      );
    }
    if (doneId) {
      conn.query(
        `insert into tasks values("${doneId}","${content}","${collectionId}")`,
        (err, row) => {
          if (err) console.log(err);
          res.send(true);
        }
      );
    }
  }
  if (collectionPostToken === "error") {
    res.status(401).send("unauthenticated");
  }
});
app.post("/collection/tasks/delete/:collectionId", (req, res) => {
  const taskDeleteToken = checkToken(req.headers.cookie);
  const { taskId } = req.body;
  if (taskDeleteToken === "expiredError" || taskDeleteToken === "success") {
    if (taskDeleteToken === "expiredError") {
      const { uid } = req.cookies;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(`delete from tasks where taskId=${taskId}`, (err, row) => {
      if (err) console.log(err);
      res.send(true);
    });
  }
  if (taskDeleteToken === "error") {
    res.status(401).send("unauthenticated");
  }
});

app.post("/collection/done/:collectionId", (req, res) => {
  const donePostToken = checkToken(req.headers.cookie);
  const collectionId = req.params.collectionId;
  const { content } = req.body;
  const { doneId } = req.body;
  if (donePostToken === "success" || donePostToken === "expiredError") {
    if (donePostToken === "expiredError") {
      const { uid } = req.cookies;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(
      `insert into done values("${doneId}","${content}","${collectionId}")`,
      (err, row, field) => {
        if (err) console.log(err);
        if (row.affectedRows) {
          res.send(true);
        }
      }
    );
  }
  if (donePostToken === "error") {
    res.status(401).send("unauthenticated");
  }
});
app.post("/collection/done/delete/:collectionId", (req, res) => {
  const doneDeleteToken = checkToken(req.headers.cookie);
  const { doneId } = req.body;
  if (doneDeleteToken === "expiredError" || doneDeleteToken === "success") {
    if (doneDeleteToken === "expiredError") {
      const { uid } = req.cookies;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(`delete from done where doneId=${doneId}`, (err, row) => {
      if (err) console.log(err);
      res.send(true);
    });
  }
  if (doneDeleteToken === "error") {
    res.status(401).send("unauthenticated");
  }
});

app.get("/collection/popup/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;
  const collectionIdCheckToken = checkToken(req.headers.cookie);
  if (
    collectionIdCheckToken === "success" ||
    collectionIdCheckToken === "expiredError"
  ) {
    if (collectionIdCheckToken === "expiredError") {
      const uid = req.cookies.uid;
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(
      `select * from todo where collectionId=${collectionId}`,
      (err, row) => {
        if (err) console.log(err);
        res.json(row);
      }
    );
  }
  if (collectionIdCheckToken === "error") {
    res.status(401).send("unauthenticated");
  }
});
app.put("/collection/popup/:collectionId", async (req, res) => {
  const collectionId = req.params.collectionId;
  const { color } = req.body;
  const { collection } = req.body;
  const { uid } = req.body;
  const collectionPutCheckToken = checkToken(req.headers.cookie);
  if (
    collectionPutCheckToken === "success" ||
    collectionPutCheckToken === "expiredError"
  ) {
    if (collectionPutCheckToken === "expiredError") {
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(
      `update todo set color="${color}", collection="${collection}" where collectionId=${collectionId}`,
      (err, row) => {
        if (err) console.log(err);
        if (row.affectedRows) {
          res.send(true);
        }
      }
    );
  }
  if (collectionPutCheckToken === "error") {
    res.status(401).send("unauthenticated");
  }
});

app.post("/login", async (req, res) => {
  const { uid, pwd } = req.body;
  await conn.query(`select * from tuser where uid="${uid}"`, (err, row) => {
    if (err) {
      res.json(false);
    }
    if (row[0] && pwd === row[0].pwd) {
      let refreshToken = makeToken("refresh", uid);
      let accessToken = makeToken("access", uid);
      conn.query(
        `insert into tokens values("${refreshToken}","${uid}")`,
        (err) => {
          if (err) console.log(err);
          res.cookie("uid", `${uid}`);
          res.cookie("access_token", `${accessToken}`);
          res.json({ access_token: accessToken });
        }
      );
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

app.post("/collections", (req, res) => {
  const collectionCheckToken = checkToken(req.headers.cookie);
  const { uid, collection, color } = req.body.todo;
  if (
    collectionCheckToken === "success" ||
    collectionCheckToken === "expiredError"
  ) {
    if (collectionCheckToken === "expiredError") {
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    try {
      const collectionData = [];
      conn.query(
        `insert into todo values("${uid}","${collection}","${color}",0)`,
        (err, row, field) => {
          if (err) console.log(err);
          conn.query(
            `select * from todo where uid="${uid}"`,
            (err, row, field) => {
              if (err) {
                console.log(err);
                res.status(404).send("DB error");
              }
              row.forEach((item) => {
                collectionData.push({ ...item });
              });
              res.send(collectionData);
            }
          );
        }
      );
    } catch (err) {
      res.status(404).send("DB error");
    }
  }
  if (collectionCheckToken === "error") {
    res.status(401).send("unauthenticated");
  }
});
app.get("/collections/:uid", async (req, res) => {
  const getCollectionCheckToken = checkToken(req.headers.cookie);
  const uid = req.params.uid;
  const collectionData = [];
  if (
    getCollectionCheckToken === "success" ||
    getCollectionCheckToken === "expiredError"
  ) {
    if (getCollectionCheckToken === "expiredError") {
      conn.query(`select * from tokens where uid="${uid}"`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    try {
      conn.query(`select * from todo where uid="${uid}"`, (err, row, field) => {
        if (err) console.log(err);
        row.forEach((item) => {
          collectionData.push({ ...item });
        });
        res.send(collectionData);
      });
    } catch (err) {
      console.log(err);
    }
  }
  if (getCollectionCheckToken === "error") {
    res.status(401).send("unauthenticated");
  }
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
  const { code, social } = req.body;
  if (social === "kakao") {
    try {
      const getTokenOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        redirect: "follow",
      };
      const fetchGetToken = await fetch(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_API_KEY}&code=${code}`,
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
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}`
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

app.delete("/logout/:uid", async (req, res) => {
  const logoutToken = checkToken(req.headers.cookie);
  const uid = req.params.uid;
  if (logoutToken === "expiredError" || logoutToken === "success") {
    if (logoutToken === "expiredError") {
      conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
        if (err) {
          res.status(404);
          return;
        }
        if (row[0]) {
          const remakedToken = makeToken("access", uid);
          res.cookie("access_token", `${remakedToken}`);
          res.cookie("uid", `${uid}`);
        }
        if (!row[0]) {
          res.status(401).send("unauthorized");
          return;
        }
      });
    }
    conn.query(`delete from tokens where uid="${uid}"`, (err, row) => {
      if (err) console.log(err);
      res.send(true);
    });
  }
  if (logoutToken === "error") {
    res.status(401).send("unauthorized");
  }
});

app.get("/login/:uid", (req, res) => {
  const uid = req.params.uid;
  conn.query(`select * from tokens where uid=${uid}`, (err, row) => {
    if (err) console.log(err);
    res.send(true);
  });
});

app.listen(3500, () => {
  console.log("Running");
});
