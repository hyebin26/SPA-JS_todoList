import { MyReact } from "./core/react.js";
import App from "./index.js";

export const Route = ({ state }, link) => {
  history.pushState(state, "", link);
  MyReact.render(App, document.querySelector("#root"));
  MyReact.options.states = [];
};

export const Router = {
  push: (link, state) => {
    MyReact.render(App, document.querySelector("#root"));
    MyReact.options.states = [];
    history.pushState(state, "", link);
  },
};
