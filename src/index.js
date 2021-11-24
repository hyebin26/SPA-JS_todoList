import Main from "./main/main.js";
import Header from "./header/header.js";
import Popup from "./popup/popup.js";
import Content from "./content/content.js";
import Login from "./login/login.js";
import SignUp from "./signUp/signUp.js";
import Router from "/src/realRouter.js";

const handleLinkChange = () => {
  const root = document.querySelector("#root");
  root.innerHTML = `${Router.HandleSubmitRoute()}`;
};

const RenderHTML = () => {
  const indexCss = document.createElement("link");
  indexCss.rel = "stylesheet";
  indexCss.href = "/src/index.css";
  document.head.appendChild(indexCss);

  window.addEventListener("popstate", handleLinkChange);
  root.innerHTML = `${Router.HandleSubmitRoute()}`;

  const allLink = document.querySelectorAll("a");
  allLink.forEach((v) => {
    v.addEventListener("click", Router.HandleLink);
  });

  // ${Header()}
  //  ${Main()}

  // const mainAddBtn = document.querySelector(".mainAddBtn");
  // mainAddBtn.addEventListener("click", InitController.clickPopupBtn);
};
RenderHTML();

export default RenderHTML;
