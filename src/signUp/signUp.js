import RenderHTML from "/src/index.js";
import { Link } from "/src/link.js";

const makeInputBox = ({
  _type,
  _placeholder,
  _text,
  _title,
  _event,
  _nickname,
}) => {
  const category = _title.toLowerCase();
  return `
  <div class="signUp${_title}Box">
    <h3>${_placeholder}</h3>
    <p>${_text}</p>
    <input onfocusout="${_event}(this)" type="${_type}" data-category="${category}" placeholder="${_placeholder}" class="signUp${_title}Input" value="${
    _nickname ? _nickname : ""
  }">   
    <p class="signUpFalseText"></p>
  </div>
    `;
};

const SignUp = () => {
  window.clickSignUpBtn = async () => {
    const duplicate = document.querySelectorAll(".falseSignup");
    const uid = document.querySelector(".signUpUidInput")
      ? document.querySelector(".signUpUidInput").value
      : history.state.id;
    const pwd = document.querySelector(".signUpPasswordInput")
      ? document.querySelector(".signUpPasswordInput").value
      : null;
    const uname = document.querySelector(".signUpUnameInput").value;
    window.duplicateCheck(document.querySelector(".signUpUnameInput"));
    if (duplicate.length) {
      duplicate.forEach((item) => {
        item.textContent = "필수 입력 항목입니다.";
      });
    } //
    else if (uid.length < 6 && pwd.length < 8 && uname < 2) {
      alert("다시 시도해주세요.");
    } //
    else {
      const fetchSignUpSuccess = await axios.post("/signUp/success", {
        uid,
        pwd,
        uname,
      });
      const signUpSuccess = await fetchSignUpSuccess.data;
      if (signUpSuccess) {
        if (history.state.id) {
          const getAccessToken = await axios.post("/signUp/social", {
            uid: history.state.id,
          });
          const { access_token } = getAccessToken.data;
          localStorage.setItem("uid", history.state.id);
          localStorage.setItem("access_token", access_token);
          history.pushState({}, "main Page", "/main");
          RenderHTML();
        } //
        else {
          history.pushState({}, "Login Page", "/");
          RenderHTML();
        }
      } //
      else alert("다시 시도해주세요.");
    }
  };
  window.focusOutPassword = (taget) => {
    const PASS_MIN = 8,
      PASS_MAX = 20;
    const text = taget.value;
    const reg = /[0-9]/;
    const engReg = /[a-zA-Z]/;
    if (
      text.length < PASS_MIN ||
      text.length > PASS_MAX ||
      !engReg.test(text) ||
      !reg.test(text)
    ) {
      if (taget.parentNode.className === "signUpPasswordBox") {
        taget.nextElementSibling.textContent =
          "비밀 번호는 영문,숫자 포함 8글자 이상이어야 합니다.";
        taget.nextElementSibling.classList.add("falseSignup");
      } else {
        const checkPass = document.querySelector(".signUpPasswordInput");
        if (checkPass.value !== taget.value) {
          taget.nextElementSibling.textContent =
            "비밀번호가 일치하지 않습니다.";
          taget.nextElementSibling.classList.add("falseSignup");
        } else {
          taget.nextElementSibling.textContent = "";
          taget.nextElementSibling.classList.remove("falseSignup");
        }
      }
    } else {
      taget.nextElementSibling.textContent = "";
      taget.nextElementSibling.classList.remove("falseSignup");
    }
  };
  window.duplicateCheck = async (target) => {
    const [ID_MIN, ID_MAX] = [6, 20];
    const [UNAME_MIN, UNAME_MAX] = [2, 15];
    const check = target.value;
    const { category } = target.dataset;

    if (category === "uid") {
      if (check.length >= ID_MIN && check.length <= ID_MAX) {
        target.nextElementSibling.textContent = "";
        target.nextElementSibling.classList.remove("falseSignup");
        const fetchId = await axios.post(`/signUp/check`, { check, category });
        const checkId = await fetchId.data;
        if (checkId) {
          target.nextElementSibling.classList.remove("falseSignup");
          target.nextElementSibling.textContent = "";
        } else {
          target.nextElementSibling.classList.add("falseSignup");
          target.nextElementSibling.textContent = "중복된 아이디가 존재합니다.";
        }
      } else {
        target.nextElementSibling.textContent =
          "아이디는 6~20자 이어야 합니다.";
        target.nextElementSibling.classList.add("falseSignup");
      }
    }
    if (category === "uname") {
      if (check.length >= UNAME_MIN && check.length <= UNAME_MAX) {
        target.nextElementSibling.textContent = "";
        target.nextElementSibling.classList.remove("falseSignup");
        const fetchId = await axios.post(`/signUp/check`, { check, category });
        const checkId = await fetchId.data;
        if (checkId) {
          target.nextElementSibling.textContent = "";
          target.nextElementSibling.classList.remove("falseSignup");
        } else {
          target.nextElementSibling.textContent = "중복된 닉네임이 존재합니다.";
          target.nextElementSibling.classList.add("falseSignup");
        }
      } else {
        target.nextElementSibling.classList.add("falseSignup");
        target.nextElementSibling.textContent =
          "닉네임은 2~15자 이어야 합니다.";
      }
    }
  };
  const signUpCss = document.createElement("link");
  signUpCss.rel = "stylesheet";
  signUpCss.href = "/src/signUp/signUp.css";
  document.head.appendChild(signUpCss);

  const emailObj = {
    _type: "text",
    _placeholder: "아이디",
    _text: "아이디를 입력해주세요.(6~20자)",
    _title: "Uid",
    _event: "duplicateCheck",
  };
  const passwordObj = {
    _type: "password",
    _placeholder: "비밀번호",
    _text: "영문,숫자를 포함한 비밀번호를 입력해주세요.(8~20자)",
    _title: "Password",
    _event: "focusOutPassword",
  };
  const passwordCheckObj = {
    _type: "password",
    _placeholder: "비밀번호 확인",
    _text: "위의 비밀번호를 입력해주세요.",
    _title: "PasswordCheck",
    _event: "focusOutPassword",
  };
  const nicknameObj = {
    _type: "text",
    _placeholder: "닉네임",
    _text: "다른 유저와 겹치지 않는 별명을 입력해주세요.(2~15자)",
    _title: "Uname",
    _event: "duplicateCheck",
    _nickname: history.state ? history.state.nickname : "",
  };
  if (history.state) {
    return `
    <section>
    <div class="signUpLogoBox">
      ${Link({
        to: "/",
        content: "GO TASKS",
      })}
    </div>
    <div class="signUpInputBox">
      ${makeInputBox(nicknameObj)}
      <div class="signUpBtnBox">
        <button class="signUpBtn" onclick="clickSignUpBtn()">회원가입하기</button>
        <span>이미 아이디가 있으신가요?</span>
        ${Link({ to: "/", content: "로그인" })}
      </div>
    </div>
    </section>`;
  }
  if (!history.state) {
    return `
  <section>
  <div class="signUpLogoBox">
    ${Link({
      to: "/",
      content: "GO TASKS",
    })}
  </div>
  <div class="signUpInputBox">
    ${makeInputBox(emailObj)}
    ${makeInputBox(passwordObj)}
    ${makeInputBox(passwordCheckObj)}
    ${makeInputBox(nicknameObj)}
    <div class="signUpBtnBox">
      <button class="signUpBtn" onclick="clickSignUpBtn()">회원가입하기</button>
      <span>이미 아이디가 있으신가요?</span>
      ${Link({ to: "/", content: "로그인" })}
    </div>
  </div>
  </section>`;
  }
};

export default SignUp;
