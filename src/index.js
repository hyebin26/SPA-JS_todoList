import Main from "./main/main.js";
// import Header from "./header/header.js";
// import Content from "./content/content.js";
import Login from "./login/login.js";
// import SignUp from "./signUp/signUp.js";
import { MyReact } from "./core/react.js";
import Router, { Route } from "./router.js";
import SignUp from "./signUp/signUp.js";
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
  const url = new URL(window.location.href);
  return `
  ${
    url.pathname === "/"
      ? Login()
      : url.pathname === "/main"
      ? Main()
      : url.pathname === "/signUp"
      ? SignUp()
      : "hello"
  }
  `;

  // return `
  //   ${Router.HandleRoute(url.pathname)}
  // `;
};

MyReact.render(App, document.querySelector("#root"));

export default App;
