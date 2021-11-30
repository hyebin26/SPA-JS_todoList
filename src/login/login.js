import RenderHTML from "/src/index.js";
import { Link } from "/src/link.js";

const Login = () => {
  window.submitLogin = async (e) => {
    e.preventDefault();
    const falseLogin = document.querySelector(".falseLogin");
    const uid = e.target[0].value,
      pwd = e.target[1].value;
    try {
      const loginData = await axios.post("/login", { uid, pwd });
      const { accessToken } = await loginData.data;
      if (accessToken) {
        falseLogin.textContent = "";
        localStorage.setItem("uid", uid);
        localStorage.setItem("access_token", accessToken);
        history.pushState(null, "", "/main");
        RenderHTML();
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
      const fetchKakaoBtn = await axios(`/kakao/auth`); //
      const { kakaoAuthURL } = await fetchKakaoBtn.data;
      location.href = kakaoAuthURL;
    } catch (err) {
      console.log(err);
    }
  };
  const sendSocialToken = async (social, token) => {
    const getUserData = await axios.post(`/social/token`, { token, social });
    const { needSignup, id, nickname, access_token } = getUserData.data;
    if (needSignup) {
      history.pushState({ id, nickname }, "", "/signUp");
      RenderHTML();
    }
    if (!needSignup) {
      // id랑 access_token발급
      localStorage.setItem("uid", id);
      localStorage.setItem("access_token", access_token);
      history.pushState("", "", "/main");
      RenderHTML();
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
      <img src="/image/task.png">
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
