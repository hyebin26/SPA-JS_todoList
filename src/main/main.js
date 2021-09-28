const Main = () => {
  const mainRoot = document.getElementById("root");
  const mainSec = document.createElement("section");

  mainSec.class = "main";
  mainRoot.append(mainSec);

  const mainCss = document.createElement("link");
  mainCss.rel = "stylesheet";
  mainCss.href = "/main/main.css";
  document.head.appendChild(mainCss);
};

export default Main;
