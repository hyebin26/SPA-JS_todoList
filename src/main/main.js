import Header from "../header/header.js";
import MainCollection from "../mainCollection/mainCollection.js";
import Popup from "../popup/popup.js";
import { MyReact } from "../core/react.js";

const Main = () => {
  const [collectionData, setCollectionData] = MyReact.useState([]);
  const [loading, setLoading] = MyReact.useState(false);

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
    const data = await sendLoadData.data;
    setLoading(true);
    setCollectionData(data);
  };
  document.addEventListener("DOMContentLoaded", loadCollectionData());

  window.clickPopupBtn = () => {
    const clickPopup = document.querySelector(".popupContainer");
    clickPopup.classList.add("activeP");
  };
  console.log(collectionData);
  // useState로 상태가 변경되면 리렌더링 하게
  // 근데 여기서 중요한 건 그 컴포넌트만 리렌더링이 되어야 함 ....(ㅠ__ㅠ )~
  if (loading) {
    return `
  ${Header()}
  ${Popup()}
  <section class=${collectionData.length ? "main" : "noCollectionBox"}>
    ${
      collectionData.length
        ? `
         <h2>Collections</h2>
         <ul>
            ${collectionData.map((item) => MainCollection(item))}
         </ul>
         <button class="addMainBtn" onclick="clickPopupBtn()">
           Add Collection
         </button>
        `
        : `
          <h2 class="noCollectionTitle">You have no collection.</h2>
          <button class="addSubBtn" onclick="clickPopupBtn()">
            Add Your First Collection
          </button>
        `
    }
    <ul>
 
    </section>`;
  }
  if (!loading) {
    return `
    <h2>Loading...</h2>
    `;
  }
};

export default Main;
