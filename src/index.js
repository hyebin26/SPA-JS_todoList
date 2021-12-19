import Main from "./main/main.js";
import Login from "./login/login.js";
import { MyReact } from "./core/react.js";
import SignUp from "./signUp/signUp.js";
import Collection from "./collection/collection.js";

const App = () => {
  const url = new URL(window.location.href);
  window.addEventListener("popstate", () => {
    MyReact.render(App, document.querySelector("#root"));
  });
  const searchPathname = url.pathname.split("/");
  const collectionId =
    searchPathname[1] === "collection" ? searchPathname[2] : null;

  return `
  ${
    url.pathname === "/"
      ? Login()
      : url.pathname === "/main"
      ? Main()
      : url.pathname === "/signUp"
      ? SignUp()
      : url.pathname === `/collection/${collectionId}`
      ? Collection(collectionId)
      : `<h1>페이지가 없습니다.</h1>`
  }
  `;
};

MyReact.render(App, document.querySelector("#root"));

export default App;
