import Main from "./main/main.js";
import Header from "./header/header.js";
import Popup from "./popup/popup.js";
import Content from "./content/content.js";
import Login from "./login/login.js";
import SignUp from "./signUp/signUp.js";

const init = () => {
  const root = document.querySelector("#root");
  const indexCss = document.createElement("link");
  indexCss.rel = "stylesheet";
  indexCss.href = "/index.css";
  document.head.appendChild(indexCss);

  root.innerHTML = `
  ${Login()}
  `;
  // ${Header()}
  //  ${Main()}

  // const mainAddBtn = document.querySelector(".mainAddBtn");
  // mainAddBtn.addEventListener("click", InitController.clickPopupBtn);
};
init();
