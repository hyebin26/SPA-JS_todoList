import RenderHTML from "/src/index.js";

const Header = () => {
  const headerCss = document.createElement("link");
  headerCss.rel = "stylesheet";
  headerCss.href = "/src/header/header.css";
  document.head.appendChild(headerCss);

  window.clickLogoutBtn = async () => {
    const logout = await axios.post(
      "/logout",
      {
        uid: localStorage.getItem("uid"),
      },
      { headers: { authorization: localStorage.getItem("access_token") } }
    );

    if (logout.data) {
      localStorage.removeItem("uid");
      localStorage.removeItem("access_token");
      history.pushState({}, "", "/");
      RenderHTML();
    } else {
      alert("API권한이 없습니다.");
    }
  };

  return `<section class="header">
  <div class="dashBox">
    <img src="/image/dashboard.png" alt="dashboard">
    <p>Dashboard</p>
  </div>
  <div class="profileBox">
    <button class="profileBtn" onclick="clickLogoutBtn()">로그아웃</button>
  </div>
  </section>`;
};
export default Header;
