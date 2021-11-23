const Header = () => {
  const headerCss = document.createElement("link");
  headerCss.rel = "stylesheet";
  headerCss.href = "/src/header/header.css";
  document.head.appendChild(headerCss);

  return `<section class="header">
  <div class="dashBox">
    <img src="/image/dashboard.png" alt="dashboard">
    <p>Dashboard</p>
  </div>
  <div class="profileBox">
    <button class="profileBtn">로그아웃</button>
  </div>
  </section>`;
};
export default Header;
