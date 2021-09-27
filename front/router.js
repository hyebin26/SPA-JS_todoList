const linkTest = () => {
  const linkRoot = document.getElementById("root");
  const linkDiv = document.createElement("div");
  const aboutLink = document.createElement("a");
  const homeLink = document.createElement("a");
  const detailLink = document.createElement("a");

  aboutLink.href = "#";
  homeLink.href = "#";
  detailLink.href = "#";

  aboutLink.textContent = "about";
  homeLink.textContent = "home";
  detailLink.textContent = "detail";

  linkDiv.append(aboutLink, homeLink, detailLink);

  linkRoot.append(linkDiv);
};

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("route page") },
    { path: "/detail", view: () => console.log("main page") },
    { path: "/about", view: () => console.log("detail page") },
  ];
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((item) => item.isMatch);

  if (!match) {
    document.querySelector("#root").innerHTML = `<h1>404</h1>`;
    return;
  }
  console.log(match.route.view());
};

const navigateTo = (url) => {
  history.pushState({}, null, url);
  router();
};

const controlLink = () => {
  document.addEventListener("DOMContentLoadeed", () => {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
      }
    });
  });
};

const routerInit = () => {
  router();
  linkTest();
};
routerInit();
