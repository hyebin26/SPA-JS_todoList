import { MyReact } from "./core/react.js";
import App from "./index.js";

export const Link = ({ to, content, className, state }) => {
  window.onClickAtag = (e) => {
    e.preventDefault();
    const root = document.getElementById("root");
    history.pushState(state ? state : null, "", e.target.href);
    MyReact.render(App, root);
  };
  return `<a onclick="onClickAtag(event)"href="${to}" ${
    className ? `class="${className}"` : className
  }>${content}</a>`;
};
