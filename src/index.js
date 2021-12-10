import Main from "./main/main.js";
// import Header from "./header/header.js";
// import Content from "./content/content.js";
import Login from "./login/login.js";
import { MyReact } from "./core/react.js";
import SignUp from "./signUp/signUp.js";

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
      : "hello"
  }
  `;
};

MyReact.render(App, document.querySelector("#root"));

export default App;
