import RenderHTML from "/src/index.js";

const Login = () => {
  window.submitLogin = async (e) => {
    e.preventDefault();
    const falseLogin = document.querySelector(".falseLogin");
    const uid = e.target[0].value,
      pwd = e.target[1].value;
    try {
      const loginData = await axios.post("/login", { uid, pwd });
      const { accessToken, uname } = await loginData.data;
      if (accessToken) {
        axios.defaults.headers.common[`Authorization`] = accessToken;
        falseLogin.textContent = "";
        localStorage.setItem("uname", uname);
        history.pushState({}, "", "/main");
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
  const loginCss = document.createElement("link");
  loginCss.rel = "stylesheet";
  loginCss.href = "/src/login/login.css";
  document.head.appendChild(loginCss);

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
      <a data-link="/signUp">회원가입</a>
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
