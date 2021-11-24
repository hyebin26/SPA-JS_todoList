import RenderHTML from "/src/index.js";
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
  HandleRoute: (content) => {
    history.pushState({}, "", content);
    const url = new URL(window.location.href);
    const filterRouter = Router.routes.filter((v) => v.path === url.pathname);
    return filterRouter.length
      ? filterRouter[0].view()
      : `<h1>페이지를 찾을 수 없습니다.</h1>`;
  },
  HandleLink: (e) => {
    e.preventDefault();
    const { link } = e.target.dataset;
    history.pushState({}, "", link);
    RenderHTML();
  },
};

export default Router;
