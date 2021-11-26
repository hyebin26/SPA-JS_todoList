import Header from "../header/header.js";
import MainCollection from "../mainCollection/mainCollection.js";
import Popup from "../popup/popup.js";

const Main = () => {
  const mainCss = document.createElement("link");
  mainCss.rel = "stylesheet";
  mainCss.href = "/src/main/main.css";
  document.head.appendChild(mainCss);

  let collectionData = [];
  window.loadCollectionData = async () => {
    const uid = localStorage.getItem("uid");
    const sendLoadData = await axios.post(
      "/collection/load",
      { uid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    collectionData = await sendLoadData.data;
  };
  document.addEventListener("DOMContentLoaded", loadCollectionData());

  window.clickPopupBtn = () => {
    const clickPopup = document.querySelector(".popupContainer");
    clickPopup.classList.add("activeP");
  };

  // => 결국 문제는 collection로딩이 오래걸리는것이 문제
  // 로딩 애니메이션을 만들기

  return `
  ${Header()}
  ${Popup()}
  <section class="main">
    <h2>Collections</h2>
    <ul>
      ${collectionData.map((list) => MainCollection(list))}
    </ul>
  </section>`;
  // <h2>You have no collections.</h2>
  // <button class="mainAddBtn" onclick="clickPopupBtn()">Add Your First Collection</button>
};

export default Main;
