import { MyReact } from "./react.js";
import App from "../index.js";

export const Router = {
  push: (link, state) => {
    MyReact.render(App, document.querySelector("#root"));
    MyReact.options.states = [];
    history.pushState({ ...state }, "", link);
  },
};
