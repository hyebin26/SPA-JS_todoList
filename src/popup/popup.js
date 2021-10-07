const clickColor = (e) => {
  const clickedColor = document.getElementsByClassName("clickedColor");
  clickedColor[0].style.backgroundColor = "#1d1d27";
  clickedColor[0].classList.remove("clickedColor");
  e.target.classList.add("clickedColor");
  clickedColor[0].style.backgroundColor = e.target.style.borderColor;
};
const Popup = () => {
  const popupRoot = document.getElementById("root");
  const popupContainer = document.createElement("div");
  const popupBox = document.createElement("div");
  const popupTitleBox = document.createElement("div");
  const popupNameBox = document.createElement("div");
  const popupColorBox = document.createElement("div");
  const popupBtnBox = document.createElement("div");
  const popupColorUl = document.createElement("ul");
  const popupColorP = document.createElement("p");
  const popupNameP = document.createElement("p");
  const popupNameInput = document.createElement("input");
  const popupTitle = document.createElement("h3");
  const popupXBtn = document.createElement("button");
  const popupCancelBtn = document.createElement("button");
  const popupCreateBtn = document.createElement("button");

  const colorList = [
    "#FC76A1",
    "#DBBE56",
    "#E39264",
    "#D25A61",
    "#AE68E6",
    "#70C4BF",
    "#9E7F72",
  ];
  for (let i = 0; i <= colorList.length - 1; i++) {
    const popupColorList = document.createElement("li");
    if (i === 0) popupColorList.className = "clickedColor";
    popupColorList.dataset.color = colorList[i];
    popupColorList.classList.add("colorList");
    popupColorList.style.border = `3px solid ${colorList[i]}`;
    popupColorList.addEventListener("click", clickColor);
    popupColorUl.append(popupColorList);
  }
  popupTitle.textContent = "Add Collection";
  popupXBtn.textContent = "X";
  popupNameP.textContent = "Name";
  popupColorP.textContent = "Color";
  popupNameInput.placeholder = "My Collection";
  popupCreateBtn.textContent = "Create";
  popupCancelBtn.textContent = "Cancel";

  popupContainer.className = "popupContainer";
  popupBox.className = "popupBox";
  popupTitleBox.className = "popupTitleBox";
  popupColorBox.className = "popupColorBox";
  popupNameBox.className = "popupNameBox";
  popupBtnBox.className = "popupBtnBox";
  popupCreateBtn.className = "popupCreateBtn";
  popupCancelBtn.className = "popupCancelBtn";

  popupTitleBox.append(popupTitle, popupXBtn);
  popupColorBox.append(popupColorP, popupColorUl);
  popupNameBox.append(popupNameP, popupNameInput);
  popupBtnBox.append(popupCreateBtn, popupCancelBtn);
  popupBox.append(popupTitleBox, popupNameBox, popupColorBox, popupBtnBox);
  popupContainer.append(popupBox);
  popupRoot.append(popupContainer);

  const popupCss = document.createElement("link");
  popupCss.rel = "stylesheet";
  popupCss.href = "/popup/popup.css";
  document.head.appendChild(popupCss);
};
export default Popup;
