import Main from "./component/main/main.js";
import Login from "./component/login/login.js";
import { MyReact } from "./util/react.js";
import SignUp from "./component/signUp/signUp.js";
import Collection from "./component/collection/collection.js";

const App = () => {
  const url = new URL(window.location.href);
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
