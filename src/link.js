import { MyReact } from "./core/react.js";
import App from "./index.js";

export const Link = ({ to, content, state }) => {
  window.onClickAtag = (e) => {
    e.preventDefault();
    const root = document.getElementById("root");
    history.pushState(state ? state : null, "", e.currentTarget.href);
    MyReact.render(App, root);
    MyReact.options.states = [];
  };

  return `<a onclick="onClickAtag(event)" href="${to}" >${content}</a>`;
};
