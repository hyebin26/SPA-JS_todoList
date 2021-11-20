const Login = () => {
  // loginInputBox.addEventListener("submit", submitLogin);
  // kakaoImage.addEventListener("click", clickKakaoBtn);
  // naverImage.addEventListener("click", clickNaverBtn);
  window.submitLogin = async (e) => {
    e.preventDefault();
    const falseLogin = document.querySelector(".falseLogin");
    const uid = e.target[0].value,
      pwd = e.target[1].value;
    try {
      const loginData = await axios.post("/login", { uid, pwd });
      const { accessToken, uname } = await loginData.data;
      if (accessToken) {
        axios.defaults.headers.common.Cookie = accessToken;
        falseLogin.textContent = "";
        localStorage.setItem("uname", uname);
        // 페이지 collection이동 하기
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

  const sendAuthToken = async (social, token) => {
    const getUserData = await axios.post(`/social/token`, { token, social });
    const user = await getUserData.data;
    if (id) {
      // id와 닉네임을 가지고 social/signup으로
    }
    if (!id) {
      localStorage.setItem("nickname", user.nickname);
      // 닉네임 저장하고 main으로
    }
  };
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    if (urlParams.has("state")) {
      sendAuthToken("naver", urlParams.get("code"));
    } //
    else sendAuthToken("kakao", urlParams.get("code"));
  }

  const loginCss = document.createElement("link");
  loginCss.rel = "stylesheet";
  loginCss.href = "/login/login.css";
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
      <a href="#">회원가입</a>
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
