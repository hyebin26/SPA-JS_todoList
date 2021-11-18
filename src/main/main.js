import Popup from "../popup/popup.js";

const Main = () => {
  const mainCss = document.createElement("link");
  mainCss.rel = "stylesheet";
  mainCss.href = "/main/main.css";
  document.head.appendChild(mainCss);

  window.loadCollectionData = async () => {
    const uname = localStorage.getItem("uname");
    const loadCollectionRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uname }),
    };
    const fetchLoadData = await fetch(
      "/collection/load",
      loadCollectionRequest
    );
    const collectionData = await fetchLoadData.json();
    console.log("check");
  };
  window.clickPopupBtn = () => {
    // const clickPopup = document.querySelector(".popupContainer");
    // clickPopup.classList.add("activeP");
    console.log("hi");
  };

  document.addEventListener("DOMContentLoaded", loadCollectionData());

  return `<section class="main">
    <h2>You have no collections.</h2>
    <button class="mainAddBtn" onclick="clickPopupBtn">Add Your First Collection</button>
  </section>`;
};

export default Main;
