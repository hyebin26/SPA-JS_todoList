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

const getKakaoToken = async (token) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  };
  const getNickname = await fetch("/kakao/token", requestOptions);
  const { nickname } = await getNickname.json();
  console.log(nickname);
};

const Login = () => {
  const loginRoot = document.getElementById("root");
  const loginSec = document.createElement("section");
  const loginTitle = document.createElement("h1");
  const loginSocialBox = document.createElement("div");
  const loginInputBox = document.createElement("div");
  const loginSignUpBox = document.createElement("div");
  const loginEmailInput = document.createElement("input");
  const loginPasswordInput = document.createElement("input");
  const loginBtn = document.createElement("button");
  const loginKakao = document.createElement("button");
  const loginNaver = document.createElement("button");
  const loginSignUpSpan = document.createElement("span");
  const loginSignUpLink = document.createElement("a");

  loginTitle.textContent = "Login";
  loginNaver.textContent = "Naver";

  loginKakao.textContent = "Test";
  loginKakao.addEventListener("click", clickKakaoBtn);
  loginNaver.addEventListener("click", clickNaverBtn);
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    getKakaoToken(urlParams.get("code"));
  }
  loginSocialBox.append(loginKakao, loginNaver);

  loginPasswordInput.type = "password";
  loginEmailInput.type = "text";
  loginBtn.textContent = "로그인";
  loginEmailInput.placeholder = "Email";
  loginPasswordInput.placeholder = "Password";
  loginInputBox.append(loginEmailInput, loginPasswordInput, loginBtn);

  loginSignUpLink.textContent = "Sign up";
  loginSignUpSpan.textContent = "Don't have an account?";
  loginSignUpBox.append(loginSignUpLink, loginSignUpSpan);

  loginSec.append(loginTitle, loginSocialBox);
  loginRoot.append(loginSec);
};
export default Login;
