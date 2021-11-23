import Header from "../header/header.js";
import Popup from "../popup/popup.js";

const Main = () => {
  const mainCss = document.createElement("link");
  mainCss.rel = "stylesheet";
  mainCss.href = "/src/main/main.css";
  document.head.appendChild(mainCss);

  window.loadCollectionData = async () => {
    const nickname = localStorage.getItem("nickname");
    const loadCollectionRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname }),
    };
    const fetchLoadData = await axios.post("/collection/load");
    // const collectionData = await fetchLoadData.json();
    console.log("check");
  };
  window.clickPopupBtn = () => {
    // const clickPopup = document.querySelector(".popupContainer");
    // clickPopup.classList.add("activeP");
    console.log("hi");
  };
  const sendSocialToken = async (social, token) => {
    const getUserData = await axios.post(`/social/token`, { token, social });
    const { id } = getUserData.data;
    const { access_token } = getUserData.data;
    axios.defaults.headers.common["Authorization"] = access_token;
    localStorage.setItem("nickname", id);
  };
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  if (urlParams.has("code")) {
    if (urlParams.has("state")) {
      sendSocialToken("naver", urlParams.get("code"));
    } //
    else sendSocialToken("kakao", urlParams.get("code"));
  }
  // => 결국 문제는 collection로딩이 오래걸리는것이 문제
  // 로딩 애니메이션을 만들기
  document.addEventListener("DOMContentLoaded", loadCollectionData());

  // ${Popup()}
  return `
  ${Header()}
  <section class="main">
  <h2>You have no collections.</h2>
  <button class="mainAddBtn" onclick="clickPopupBtn">Add Your First Collection</button>
  </section>`;
};

export default Main;
