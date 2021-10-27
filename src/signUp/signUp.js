const SignUpController = {
  focusOutPassword: (e) => {
    const PASS_MIN = 8,
      PASS_MAX = 20;
    const text = e.target.value;
    const reg = /[0-9]/;
    const engReg = /[a-zA-Z]/;
    if (
      text.length < PASS_MIN ||
      text.length > PASS_MAX ||
      !engReg.test(text) ||
      !reg.test(text)
    ) {
      if (e.target.parentNode.className === "signUpPasswordBox") {
        e.target.nextSibling.textContent =
          "비밀 번호는 영문,숫자 포함 8글자 이상이어야 합니다.";
      } else {
        const checkPass = document.querySelector(".signUpPasswordInput");
        if (checkPass.value !== e.target.value) {
          e.target.nextSibling.textContent = "비밀번호가 일치하지 않습니다.";
        } else {
          e.target.nextSibling.textContent = "";
        }
      }
    } else {
      e.target.nextSibling.textContent = "";
    }
  },
};

const makeInputBox = ({ _type, _placeholder, _text, _title }) => {
  const makeInputBox = document.createElement("div");
  const makeInput = document.createElement("input");
  const makeP = document.createElement("p");
  const makeInputTitle = document.createElement("h3");
  const makeFalseText = document.createElement("p");

  if (_type === "password") {
    makeInput.addEventListener("focusout", SignUpController.focusOutPassword);
  }
  makeInputTitle.textContent = _placeholder;
  makeInput.type = _type;
  makeInput.placeholder = _placeholder;
  makeP.textContent = _text;

  makeFalseText.className = `signUpFalseText`;
  makeInputBox.className = `signUp${_title}Box`;
  makeInput.className = `signUp${_title}Input`;
  makeInputBox.append(makeInputTitle, makeP, makeInput, makeFalseText);
  return makeInputBox;
};

const SignUp = () => {
  const signUpRoot = document.getElementById("root");
  const signUpSec = document.createElement("section");
  const signUpLogoBox = document.createElement("div");
  const signUpLogo = document.createElement("img");
  const signUpLink = document.createElement("a");
  const signUpInputBox = document.createElement("div");
  const signUpBtnBox = document.createElement("div");
  const signUpBtn = document.createElement("button");
  const signUpSpan = document.createElement("span");
  const signUpLoginLink = document.createElement("a");

  const emailObj = {
    _type: "text",
    _placeholder: "아이디",
    _text: "영문,숫자를 포함한 아이디를 입력해주세요.(6~20자)",
    _title: "Id",
  };
  const passwordObj = {
    _type: "password",
    _placeholder: "비밀번호",
    _text: "영문,숫자를 포함한 비밀번호를 입력해주세요.(8~20자)",
    _title: "Password",
  };
  const passwordCheckObj = {
    _type: "password",
    _placeholder: "비밀번호 확인",
    _text: "위의 비밀번호를 입력해주세요.",
    _title: "PasswordCheck",
  };
  const nicknameObj = {
    _type: "text",
    _placeholder: "닉네임",
    _text: "다른 유저와 겹치지 않는 별명을 입력해주세요.(2~15자)",
    _title: "Nickname",
  };
  const signUpIdBox = makeInputBox(emailObj);
  const signUpPasswordBox = makeInputBox(passwordObj);
  const signUpPasswordCheckBox = makeInputBox(passwordCheckObj);
  const signUpNicknameBox = makeInputBox(nicknameObj);

  signUpLogo.src = "/image/task.png";
  signUpLink.href = "#";
  signUpLoginLink.href = "#";

  signUpLink.textContent = "TASKS";
  signUpBtn.textContent = "회원가입하기";
  signUpSpan.textContent = "이미 아이디가 있으신가요?";
  signUpLoginLink.textContent = "로그인";

  signUpLogoBox.className = "signUpLogoBox";
  signUpInputBox.className = "signUpInputBox";
  signUpBtnBox.className = "signUpBtnBox";

  signUpLink.append(signUpLogo);
  signUpLogoBox.append(signUpLink);
  signUpBtnBox.append(signUpBtn, signUpSpan, signUpLoginLink);
  signUpInputBox.append(
    signUpIdBox,
    signUpPasswordBox,
    signUpPasswordCheckBox,
    signUpNicknameBox,
    signUpBtnBox
  );
  signUpSec.append(signUpLogoBox, signUpInputBox);
  signUpRoot.append(signUpSec);

  const signUpCss = document.createElement("link");
  signUpCss.rel = "stylesheet";
  signUpCss.href = "/signUp/signUp.css";
  document.head.appendChild(signUpCss);
};

export default SignUp;
