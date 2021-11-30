// import Main from "./main/main.js";
// import Header from "./header/header.js";
// import Popup from "./popup/popup.js";
// import Content from "./content/content.js";
// import Login from "./login/login.js";
// import SignUp from "./signUp/signUp.js";
import { MyReact } from "./core/react.js";
// import Router from "/src/router.js";

// const RenderHTML = () => {
//   window.addEventListener("popstate", RenderHTML);
//   root.innerHTML = `${Router.HandleRoute()}`;

//   // ${Header()}
//   //  ${Main()}

//   // const mainAddBtn = document.querySelector(".mainAddBtn");
//   // mainAddBtn.addEventListener("click", InitController.clickPopupBtn);
// };
const App = () => {
  return "<h1>반갑습니다~</h1>";
};

MyReact.render(App, document.querySelector("#root"));

export default RenderHTML;
