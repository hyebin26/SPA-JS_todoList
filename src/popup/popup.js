const todo = {
  uname: localStorage.getItem("uname"),
  collection: "",
  color: "",
  tasks: [],
  done: [],
};

const Popup = () => {
  window.clickPopupColor = (target) => {
    const clickedColor = document.querySelector(".clickedColor");
    clickedColor.style.backgroundColor = "#1d1d27";
    clickedColor.classList.remove("clickedColor");
    target.classList.add("clickedColor");
    target.style.backgroundColor = target.style.borderColor;
  };
  window.clickExitBtn = () => {
    const exitPopup = document.querySelector(".popupContainer");
    exitPopup.classList.remove("activeP");
  };
  window.clickPopupCreate = () => {
    const collection = document.querySelector(".popupNameInput").value;
    const color = document.querySelector(".clickedColor").dataset.color;
    const createExit = document.querySelector(".popupContainer");
    todo["color"] = color;
    todo["collection"] = collection;
    sendCollectionData(todo);
    // createExit.classList.remove("activeP");
  };
  window.sendCollectionData = async (todo) => {
    const collectionRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo }),
    };
    await fetch("/collection/add", collectionRequest);
    //collection fetch server => server sql 추가 => collection 기져오기
    // collection이 변경되었을 때 => main에서 리렌더링이 되게
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

  const popupCss = document.createElement("link");
  popupCss.rel = "stylesheet";
  popupCss.href = "/popup/popup.css";
  document.head.appendChild(popupCss);

  return `
  <div class="popupContainer">
    <div class="popupBox">
      <div class="popupTitleBox">
        <h3>Add Collection</h3>
        <button onclick="clickExitBtn()">X</button>
      </div>
      <div class="popupNameBox">
        <p>Name</p>
        <input placeholder="My Collection" type="text" class="popupNameInput">
      </div>
      <div class="popupColorBox">
        <p>Color</p>
        <ul>
          <li class="clickedColor colorList" style="background-color:${colorList[0]}; border:3px solid ${colorList[0]}" data-color:${colorList[0]} onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[1]}" data-color:${colorList[1]} onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[2]}" data-color:${colorList[2]} onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[3]}" data-color:${colorList[3]} onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[4]}" data-color:${colorList[4]} onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[5]}" data-color:${colorList[5]} onclick="clickPopupColor(this)"></li>
        </ul>
      </div>
      <div class="popupBtnBox">
        <button class="popupCreateBtn">Create</button>
        <button class="popupCancelBtn" onclick="clickExitBtn()">Cancel</button>
      </div>
    </div>
  </div>
  `;
};
export default Popup;
