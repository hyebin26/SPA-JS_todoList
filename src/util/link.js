import { MyReact } from "./react.js";
import App from "../index.js";

export const Link = ({ to, content, state }) => {
  window.onClickAtag = (e) => {
    e.preventDefault();
    const root = document.getElementById("root");
    history.pushState(state ? state : null, "", e.currentTarget.href);
    MyReact.render(App, root);
    MyReact.options.states = [];
    window.addEventListener("popstate", () => {
      MyReact.options.states = [];
      MyReact.render(App, root);
    });
  };

  return `<a onclick="onClickAtag(event)" href="${to}" >${content}</a>`;
};
