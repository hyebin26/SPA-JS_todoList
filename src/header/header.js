const Header = () => {
  const mainRoot = document.getElementById("root");
  const headerSec = document.createElement("section");
  const dashDiv = document.createElement("div");
  const profileDiv = document.createElement("div");
  const dashP = document.createElement("p");
  const dashImg = document.createElement("img");
  const profileBtn = document.createElement("button");

  headerSec.className = "header";
  dashDiv.className = "dashBox";
  profileDiv.className = "profileBox";
  profileBtn.className = "profileBtn";

  dashImg.src = "/image/dashboard.png";
  dashImg.alt = "dashboard";
  dashP.textContent = "Dashboard";
  profileBtn.textContent = "별명";

  dashDiv.append(dashImg, dashP);
  profileDiv.append(profileBtn);
  headerSec.append(dashDiv, profileDiv);

  const headerCss = document.createElement("link");
  headerCss.rel = "stylesheet";
  headerCss.href = "/header/header.css";
  document.head.appendChild(headerCss);

  mainRoot.append(headerSec);
};
export default Header;
