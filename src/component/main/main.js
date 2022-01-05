import Header from "../header/header.js";
import MainCollection from "../mainCollection/mainCollection.js";
import Popup from "../popup/popup.js";
import { MyReact } from "../../util/react.js";

const Main = () => {
  const [collectionData, setCollectionData] = MyReact.useState([]);
  const [isShow, setIsShow] = MyReact.useState(false);
  const [loading, setLoading] = MyReact.useState(true);
  window.loadCollectionData = async () => {
    try {
      const responseMainData = await axios.get(
        `/collections/${localStorage.getItem("uid")}`
      );
      const mainData = await responseMainData.data;
      setLoading(false);
      setCollectionData(mainData);
    } catch (err) {
      if (err.response.status === 401) {
        alert("API권한이 없습니다.");
        return;
      }
      console.log(err);
      alert("다시 시도해주세요.");
    }
  };
  document.addEventListener("DOMContentLoaded", loadCollectionData());

  window.clickPopupBtn = () => {
    setIsShow(true);
  };
  return `
  ${Header()}
  ${Popup(isShow, setIsShow)}
  ${
    !loading
      ? `<section class=${collectionData.length ? "main" : "noCollectionBox"}>
  ${
    collectionData.length
      ? `
       <h2>Collections</h2>
       <ul>
          ${collectionData.map((item) => MainCollection(item)).join("")}
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
  </section>`
      : ""
  }`;
};

export default Main;
