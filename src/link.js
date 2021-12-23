import { MyReact } from "./core/react.js";
import App from "./index.js";

export const Link = ({ to, content, state }) => {
  console.log(to);
  window.onClickAtag = (e) => {
    e.preventDefault();
    const root = document.getElementById("root");
    history.pushState(state ? state : null, "", e.currentTarget.href);
    MyReact.render(App, root);
  };

  return `<a onclick="onClickAtag(event)" href="${to}" >${content}</a>`;
};
