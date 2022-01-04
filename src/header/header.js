import { Link } from "../link.js";
import { Router } from "../router.js";

const Header = () => {
  window.clickLogoutBtn = async () => {
    const headerConfirm = confirm("로그아웃하시겠습니까?");
    if (headerConfirm) {
      const logout = await axios.delete("/logout");
      if (logout.data) {
        Router.push("/");
        localStorage.removeItem("access_token");
        localStorage.removeItem("uid");
      }
      if (!logout.data) {
        alert("API권한이 없습니다.");
      }
    } else {
      return false;
    }
  };

  return `<section class="header">
  <div class="dashBox">
    ${Link({
      to: "/main",
      content: `<img src="/image/dashboard.png" alt="dashboard">
    <p>Dashboard</p>`,
    })}
  </div>
  <div class="profileBox">
    <button class="profileBtn" onclick="clickLogoutBtn()">로그아웃</button>
  </div>
  </section>`;
};
export default Header;
