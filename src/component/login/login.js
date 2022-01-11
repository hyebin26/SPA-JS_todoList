import { Router } from "/src/util/router.js";
import { Link } from "/src/util/link.js";

const Login = () => {
  const checkToken = async () => {
    try {
      const uid = localStorage.getItem("uid");
      const checkTokenForLogin = await axios.get(`/login/${uid}`);
      if (checkTokenForLogin.data) {
        Router.push("/main");
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("API권한이 없습니다.");
      }
      console.log(err);
    }
  };
  if (localStorage.getItem("uid") && localStorage.getItem("access_token")) {
    checkToken();
  }
  window.submitLogin = async (e) => {
    e.preventDefault();
    const falseLogin = document.querySelector(".falseLogin");
    const uid = e.target[0].value,
      pwd = e.target[1].value;
    try {
      const loginData = await axios.post("/login", { uid, pwd });
      const { access_token } = loginData.data;
      if (access_token) {
        falseLogin.textContent = "";
        localStorage.setItem("uid", uid);
        localStorage.setItem("access_token", access_token);
        Router.push("/main");
      } else {
        falseLogin.textContent = "아이디와 비밀번호를 확인해주세요.";
      }
    } catch (err) {
      console.log(err);
    }
  };
  window.clickNaverBtn = async (e) => {
    try {
      const fetchNaverBtn = await axios(`/naver/auth`);
      const { naverAuthURL } = await fetchNaverBtn.data;
      location.href = naverAuthURL;
    } catch (err) {
      console.log(err);
    }
  };
  window.clickKakaoBtn = async (e) => {
    try {
      const fetchKakaoBtn = await axios(`/kakao/auth`);
      const { kakaoAuthURL } = await fetchKakaoBtn.data;
      location.href = kakaoAuthURL;
    } catch (err) {
      console.log(err);
    }
  };
  const sendSocialToken = async (social, code) => {
    const getUserData = await axios.post(`/social/token`, { code, social });
    const { needSignup, id, nickname, access_token } = getUserData.data;
    if (needSignup) {
      Router.push("/signUp", { id, nickname });
    }
    if (!needSignup) {
      localStorage.setItem("uid", id);
      localStorage.setItem("access_token", access_token);
      Router.push("/main");
    }
  };
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    if (urlParams.has("state")) {
      sendSocialToken("naver", urlParams.get("code"));
    } //
    else sendSocialToken("kakao", urlParams.get("code"));
  }
  return `
  <section class="loginSec">
    <div class="loginTitleBox">
      <img src="/image/task.svg">
      <h1>TASKS</h1>
    </div>
    <form class="loginInputBox" onsubmit="submitLogin(event)">
      <input placeholder="Email" type="text">
      <input placeholder="Password" type="password">
      <p class="falseLogin"></p>
      <button>Login</button>
      ${Link({ to: "/signUp", content: "회원가입" })}
    </form>
    <div class="loginSocialBox">
      <p>SNS계정으로 간편 로그인</p>
      <img src="/image/naver_login.png" onclick="clickNaverBtn(event)">
      <img src="/image/kakao_login.svg" onclick="clickKakaoBtn(event)">
    </div>
  </section>  
  `;
};
export default Login;
