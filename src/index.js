import Main from "./main/main.js";
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
// };s
const App = () => {
  return `${Main()}`;
};

MyReact.render(App, document.querySelector("#root"));

// export default RenderHTML;
