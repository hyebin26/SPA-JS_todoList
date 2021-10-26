const localhost = "http://localhost:3500";
const clickKakaoBtn = async (e) => {
  try {
    const fetchKakaoBtn = await fetch(`${localhost}/kakao/auth`); //
    const { kakaoAuthURL } = await fetchKakaoBtn.json();
    location.href = kakaoAuthURL;
  } catch (err) {
    console.log(err);
  }
};

const clickNaverBtn = async (e) => {
  try {
    const fetchNaverBtn = await fetch(`${localhost}/naver/auth`);
    const { naverAuthURL } = await fetchNaverBtn.json();
    location.href = naverAuthURL;
  } catch (err) {
    console.log(err);
  }
};

const sendAuthToken = async (social, token) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  };
  const getNickname = await fetch(`/${social}/token`, requestOptions);
  const { nickname } = await getNickname.json();
  console.log(nickname);
};

const Login = () => {
  const loginRoot = document.getElementById("root");
  const loginSec = document.createElement("section");
  const loginTitle = document.createElement("h1");
  const loginLogo = document.createElement("img");
  const loginTitleBox = document.createElement("div");
  const loginSocialBox = document.createElement("div");
  const loginInputBox = document.createElement("div");
  const loginSocialP = document.createElement("p");
  const kakaoImage = document.createElement("img");
  const naverImage = document.createElement("img");
  const loginEmail = document.createElement("input");
  const loginPassword = document.createElement("input");
  const loginBtn = document.createElement("button");
  const loginSignup = document.createElement("a");

  loginTitle.textContent = "TASKS";
  loginSocialP.textContent = "SNS계정으로 간편 로그인";
  loginBtn.textContent = "Login";
  loginSignup.textContent = "회원가입";

  loginSignup.href = "#";

  loginEmail.placeholder = "Email";
  loginEmail.type = "text";
  loginPassword.placeholder = "Password";
  loginPassword.type = "password";

  loginLogo.src = "/image/task.png";
  naverImage.src = "/image/naver_login.png";
  kakaoImage.src = "/image/kakao_login.svg";

  loginTitleBox.className = "loginTitleBox";
  loginSocialBox.className = "loginSocialBox";
  loginInputBox.className = "loginInputBox";
  loginSec.className = "loginSec";

  kakaoImage.addEventListener("click", clickKakaoBtn);
  naverImage.addEventListener("click", clickNaverBtn);

  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    if (urlParams.has("state")) {
      sendAuthToken("naver", urlParams.get("code"));
    } //
    else sendAuthToken("kakao", urlParams.get("code"));
  }
  loginTitleBox.append(loginLogo, loginTitle);
  loginSocialBox.append(loginSocialP, naverImage, kakaoImage);
  loginInputBox.append(loginEmail, loginPassword, loginBtn, loginSignup);
  loginSec.append(loginTitleBox, loginInputBox, loginSocialBox);
  loginRoot.append(loginSec);

  const loginCss = document.createElement("link");
  loginCss.rel = "stylesheet";
  loginCss.href = "/login/login.css";
  document.head.appendChild(loginCss);
};
export default Login;
