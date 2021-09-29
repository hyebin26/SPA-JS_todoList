const clickAddBtn = () => {};

const Main = () => {
  const mainRoot = document.getElementById("root");
  const mainSec = document.createElement("section");
  const mainH2 = document.createElement("h2");
  const mainAddBtn = document.createElement("button");
  const popupContainer = document.createElement("div");

  mainSec.className = "main";
  mainAddBtn.className = "mainAddBtn";

  mainH2.textContent = "You have no collections.";
  mainAddBtn.textContent = "Add Your First Collection";

  mainSec.append(mainH2, mainAddBtn);
  mainRoot.append(mainSec);

  const mainCss = document.createElement("link");
  mainCss.rel = "stylesheet";
  mainCss.href = "/main/main.css";
  document.head.appendChild(mainCss);
  mainAddBtn.addEventListener("click", clickAddBtn);
};

export default Main;
