import { MyReact } from "./core/react.js";
import App from "./index.js";
import Login from "./login/login.js";
import Main from "./main/main.js";
import SignUp from "./signUp/signUp.js";

const Router = {
  routes: [
    {
      path: "/",
      view: Login,
    },
    { path: "/signUp", view: SignUp },
    { path: "/main", view: Main },
  ],
  HandleRoute: (path) => {
    const filterRouter = Router.routes.filter((v) => v.path === path);
    return filterRouter.length
      ? filterRouter[0].view()
      : `<h1>페이지를 찾을 수 없습니다.</h1>`;
  },
};
export const Route = (path, view) => {
  window.addEventListener("popstate", () => console.log("popstate"));
  return view();
};

export default Router;
