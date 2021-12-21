const todo = {
  uid: localStorage.getItem("uid"),
  collection: "",
  color: "",
  tasks: "",
  done: "",
};

const Popup = (setCollectionData) => {
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
  window.handlePopupSubmit = async (e) => {
    e.preventDefault();
    const blank_pattern = /^\s+|\s+$/g;
    const collectionTitle = document.querySelector(".popupNameInput").value;
    const color = document.querySelector(".clickedColor").dataset.color;
    const titleFalse = document.querySelector(".popupInputFalse");
    if (collectionTitle.replace(blank_pattern, "") === "") {
      titleFalse.textContent = "제목을 다시 입력해주세요.";
      return;
    }
    try {
      todo["color"] = color;
      todo["collection"] = collectionTitle;
      const exitPopup = document.querySelector(".popupContainer");
      exitPopup.classList.remove("activeP");
      titleFalse.textContent = "";
      const responseCollectionData = await axios.post("/collections", {
        todo,
      });
      setCollectionData(responseCollectionData);
      // main에 리렌더링을 해야됨 어케?
      // => 1. useState
    } catch (err) {
      if (err.response.status === 401) {
        alert("API권한이 없습니다.");
      }
    }

    // //collection fetch server => server sql 추가 => collection 기져오기
    // // collection이 변경되었을 때 => main에서 리렌더링이 되게
    // // 서버로 데이터 보내기 => BD에 데이터 저장 => 그 데이터를 리렌더링
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

  return `
  <div class="popupContainer">
    <form id="popupBox" onsubmit=handlePopupSubmit(event)>
      <div class="popupTitleBox">
        <h3>Add Collection</h3>
        <button onclick="clickExitBtn()">x</button>
      </div>
      <div class="popupNameBox">
        <p class="popupName">Name</p>
        <input placeholder="My Collection" type="text" class="popupNameInput">
        <p class="popupInputFalse"></p>
      </div>
      <div class="popupColorBox">
        <p>Color</p>
        <ul>
          <li class="clickedColor colorList" style="background:${colorList[0]};border:3px solid ${colorList[0]}" data-color="${colorList[0]}" data-color:"${colorList[0]}" onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[1]}" data-color="${colorList[1]}" onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[2]}" data-color="${colorList[2]}" onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[3]}" data-color="${colorList[3]}" onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[4]}" data-color="${colorList[4]}" onclick="clickPopupColor(this)"></li>
          <li class="colorList" style="border:3px solid ${colorList[5]}" data-color="${colorList[5]}" onclick="clickPopupColor(this)"></li>
        </ul>
      </div>
      <div class="popupBtnBox">
        <button class="popupCreateBtn" form="popupBox">Create</button>
        <button class="popupCancelBtn" onclick="clickExitBtn()">Cancel</button>
      </div>
    </form>
  </div>
  `;
};
export default Popup;
