import { MyReact } from "./core/react.js";
import App from "./index.js";

export const Route = () => {
  MyReact.render(App, document.querySelector("#root"));
};
