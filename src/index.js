import Main from "./main/main.js";
import Header from "./header/header.js";
import Popup from "./popup/popup.js";
import Content from "./content/content.js";
import Login from "./login/login.js";

const init = () => {
  Login();

  const indexCss = document.createElement("link");
  indexCss.rel = "stylesheet";
  indexCss.href = "/index.css";
  document.head.appendChild(indexCss);
};
init();
