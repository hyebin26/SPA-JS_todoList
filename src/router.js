const linkTest = () => {
  const linkRoot = document.getElementById("root");
  const linkDiv = document.createElement("div");
  const aboutLink = document.createElement("a");
  const homeLink = document.createElement("a");
  const detailLink = document.createElement("a");

  aboutLink.href = "#";
  homeLink.href = "#";
  detailLink.href = "#";

  aboutLink.id = "about";
  homeLink.id = "home";
  detailLink.id = "detail";

  aboutLink.textContent = "about";
  homeLink.textContent = "home";
  detailLink.textContent = "detail";

  linkDiv.append(aboutLink, homeLink, detailLink);

  linkRoot.append(linkDiv);
};

const clickLink = (e) => {
  e.preventDefault();
  const content = e.target.textContent === "home" ? "/" : e.target.textContent;
  history.pushState({}, "", content);
  router();
};

const linkEvent = () => {
  const aboutEvent = document.getElementById("about");
  const detailEvent = document.getElementById("detail");
  const homeEvent = document.getElementById("home");

  aboutEvent.addEventListener("click", clickLink);
  detailEvent.addEventListener("click", clickLink);
  homeEvent.addEventListener("click", clickLink);
};

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("/page") },
    { path: "/detail", view: () => console.log("detail page") },
    { path: "/about", view: () => console.log("about page") },
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
  match.route.view();
};

const routerInit = () => {
  router();
  linkTest();
  linkEvent();
  window.addEventListener("popstate", router);
};
routerInit();
