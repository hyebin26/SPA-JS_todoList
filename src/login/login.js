const kakaoTest = async (e) => {
  const { kakaoAuth } = await fetch("http://localhost:3500/kakao/auth") //
    .then((res) => res.json());
  location.href = kakaoAuth;
};

const getKakaoToken = (token) => {
  console.log(token);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  };
  fetch("/kakao/token", requestOptions);
};

//const naverBtn = new naver_id_login(NAVER.KEY, "UPyQ2zxgkM");
const NaverLogin = () => {
  const naverDiv = document.createElement("div");
  const naverRoot = document.getElementById("root");
  naverDiv.id = "naver_id_login";
  naverRoot.append(naverDiv);
  const state = naverBtn.getUniqState();
  naverBtn.setButton("white", 3, 40);
  naverBtn.setDomain("http://localhost:3500");
  naverBtn.setState(state);
  naverBtn.setPopup();
  naverBtn.init_naver_id_login();
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

  loginKakao.textContent = "Test";
  loginKakao.addEventListener("click", kakaoTest);
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    getKakaoToken(urlParams.get("code"));
  }
  loginSocialBox.append(loginKakao);

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
