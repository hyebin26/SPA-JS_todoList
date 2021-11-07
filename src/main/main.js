import Popup from "../popup/popup.js";

const MainController = {
  clickAddBtn: () => {
    const clickPopup = document.querySelector(".popupContainer");
    clickPopup.classList.add("activeP");
  },
  loadCollection: () => {
    const uname = localStorage.getItem("uname");
    const loadCollectionRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname }),
    };
    fetch("/collection/load", loadCollectionRequest);
  },
};

const Main = () => {
  const mainRoot = document.getElementById("root");
  const mainSec = document.createElement("section");
  const mainH2 = document.createElement("h2");
  const mainAddBtn = document.createElement("button");

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
  Popup();
  mainAddBtn.addEventListener("click", MainController.clickAddBtn);
};

export default Main;
