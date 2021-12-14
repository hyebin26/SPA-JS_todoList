import Main from "./main/main.js";
import Login from "./login/login.js";
import { MyReact } from "./core/react.js";
import SignUp from "./signUp/signUp.js";
import Content from "./collection/collection.js";

const App = () => {
  const url = new URL(window.location.href);
  window.addEventListener("popstate", () => {
    MyReact.render(App, document.querySelector("#root"));
  });

  return `
  ${
    url.pathname === "/"
      ? Login()
      : url.pathname === "/main"
      ? Main()
      : url.pathname === "/signUp"
      ? SignUp()
      : url.pathname === "/collection"
      ? Content()
      : `<h1>페이지가 없습니다.</h1>`
  }
  `;
};

MyReact.render(App, document.querySelector("#root"));

export default App;
