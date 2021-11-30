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
    setCollectionData(await sendLoadData.data);
  };
  document.addEventListener("DOMContentLoaded", loadCollectionData());

  window.clickPopupBtn = () => {
    const clickPopup = document.querySelector(".popupContainer");
    clickPopup.classList.add("activeP");
  };

  // useState로 상태가 변경되면 리렌더링 하게
  // 근데 여기서 중요한 건 그 컴포넌트만 리렌더링이 되어야 함 ....(ㅠ__ㅠ )~
  console.log(collectionData);
  return `
  ${Header()}
  ${Popup()}
  <section class="main">
    <h2 onclick="test()">Collections</h2>
    <ul>
    </ul>
    </section>`;
  // ${collectionData.map((list) => MainCollection(list))}
  // <h2>You have no collections.</h2>
  // <button class="mainAddBtn" onclick="clickPopupBtn()">Add Your First Collection</button>
};

export default Main;
