import { Link } from "../link.js";
import { Router } from "../router.js";

const Header = () => {
  window.clickLogoutBtn = async () => {
    const headerConfirm = confirm("로그아웃하시겠습니까?");
    if (headerConfirm) {
      try {
        const logout = await axios.delete(
          `/logout/${localStorage.getItem("uid")}`
        );
        Router.push("/");
        localStorage.removeItem("access_token");
        localStorage.removeItem("uid");
      } catch (err) {
        if (err.response.status === 401) {
          alert("API권한이 없습니다.");
          return;
        }
        alert("다시 시도해주세요.");
      }
    } else {
      return false;
    }
  };
  // if (localStorage.getItem("uid") && localStorage.getItem("access_token")) {
  //   Router.push("/");
  // }
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
