import { MyReact } from "../../util/react.js";

const Popup = (isShow, setIsShow) => {
  const [collectionData, setCollectionData] = MyReact.useState([]);
  window.clickPopupColor = (target) => {
    const clickedColor = document.querySelector(".clickedColor");
    clickedColor.style.backgroundColor = "#1d1d27";
    clickedColor.classList.remove("clickedColor");
    target.classList.add("clickedColor");
    target.style.backgroundColor = target.style.borderColor;
  };
  window.clickExitBtn = (e) => {
    setIsShow(false);
  };
  window.clickOtherContainer = (e) => {
    const parentBox = document.querySelector(".popupContainer");
    if (parentBox === e.target) {
      setIsShow(false);
    }
  };
  window.handlePopupSubmit = async (e) => {
    e.preventDefault();
    const blank_pattern = /^\s+|\s+$/g;
    const collectionTitle = document.querySelector(".popupNameInput").value;
    const color = document.querySelector(".clickedColor").dataset.color;
    const titleFalse = document.querySelector(".popupInputFalse");
    const todo = {};
    if (collectionTitle.replace(blank_pattern, "") === "") {
      titleFalse.textContent = "제목을 다시 입력해주세요.";
      return;
    }
    if (e.target.dataset.parent === "main") {
      try {
        todo["color"] = color;
        todo["collection"] = collectionTitle;
        todo["uid"] = localStorage.getItem("uid");
        titleFalse.textContent = "";
        const responseCollectionData = await axios.post("/collections", {
          todo,
        });
        setIsShow(false); // 리렌더링용
      } catch (err) {
        if (err.response.status === 401) {
          alert("API권한이 없습니다.");
          return;
        }
        console.log(err);
        alert("다시 시도해주세요.");
      }
    }
    if (e.target.dataset.parent === "collection") {
      todo["color"] = color;
      todo["collection"] = collectionTitle;
      todo["uid"] = localStorage.getItem("uid");
      const url = new URL(window.location);
      const collectionId = url.pathname.split("collection")[1];
      try {
        const putCollectionData = await axios.put(
          `/collection/popup${collectionId}`,
          todo
        );
        setIsShow(false);
      } catch (err) {
        if (err.response.status === 401) {
          alert("API권한이 없습니다.");
          return;
        }
        console.log(err);
        alert("다시 시도해주세요.");
      }
    }
  };
  const loadPopupData = async (path) => {
    const collectionId = path.split("collection")[1];
    try {
      const loadPopupData = await axios.get(`/collection/popup${collectionId}`);
      const popupData = await loadPopupData.data;
      setCollectionData(popupData);
    } catch (err) {
      if (err.response.status === 401) {
        alert("API권한이 없습니다.");
        return;
      }
      console.log(err);
      alert("다시 시도해주세요.");
    }
  };
  const colorList = [
    "#FC76A1",
    "#DBBE56",
    "#E39264",
    "#D25A61",
    "#AE68E6",
    "#70C4BF",
    "#9E7F72",
  ];
  if (isShow) {
    const url = new URL(window.location);
    if (url.pathname.includes("collection")) {
      loadPopupData(url.pathname);
    }
    return `
    <div class="popupContainer" onclick="clickOtherContainer(event)">
      <div class="popupBox"> 
        <div class="popupTitleBox">
          <h3>${
            collectionData.length ? "Change Collection" : "Add Collection"
          }</h3>
          <button onclick="clickExitBtn(event)">x</button>
        </div>
        <form id="popupForm" onsubmit="handlePopupSubmit(event)" data-parent=${
          collectionData.length ? "collection" : "main"
        }>
          <div class="popupNameBox">
            <p class="popupName">Name</p>
            <input placeholder="My Collection" type="text" class="popupNameInput" value=${
              collectionData.length ? collectionData[0].collection : ""
            }>
            <p class="popupInputFalse"></p>
          </div>
          <div class="popupColorBox">
            <p>Color</p>
            <ul>
              <li class="clickedColor colorList" style="background:${
                colorList[0]
              };border:3px solid ${colorList[0]}" data-color="${
      colorList[0]
    }" data-color:"${colorList[0]}" onclick="clickPopupColor(this)"></li>
            <li class="colorList" style="border:3px solid ${
              colorList[1]
            }" data-color="${
      colorList[1]
    }" onclick="clickPopupColor(this)"></li>
            <li class="colorList" style="border:3px solid ${
              colorList[2]
            }" data-color="${
      colorList[2]
    }" onclick="clickPopupColor(this)"></li>
            <li class="colorList" style="border:3px solid ${
              colorList[3]
            }" data-color="${
      colorList[3]
    }" onclick="clickPopupColor(this)"></li>
            <li class="colorList" style="border:3px solid ${
              colorList[4]
            }" data-color="${
      colorList[4]
    }" onclick="clickPopupColor(this)"></li>
            <li class="colorList" style="border:3px solid ${
              colorList[5]
            }" data-color="${
      colorList[5]
    }" onclick="clickPopupColor(this)"></li>
          </ul>
      </div>
        </form>
        <div class="popupBtnBox">
          <button class="popupCreateBtn" form="popupForm" >Create</button>
          <button class="popupCancelBtn" onclick="clickExitBtn(event)">Cancel</button>
        </div>
      </div>
    </div>
    `;
  }
  if (!isShow) {
    return ``;
  }
};
export default Popup;
