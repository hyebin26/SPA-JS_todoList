const linkTest = () => {
  const h2 = document.createElement("h2");
  document.querySelector("#root").innerHTML = `<h1>link</h1>`;
 
};

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("route page") },
    { path: "/main", view: () => console.log("main page") },
    { path: "/detail/:id", view: () => console.log("detail page") },
    { path: "/link", view: () => linkTest },
  ];
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((item) => item.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  if (!match) {
    document.querySelector("#root").innerHTML = `<h1>404</h1>`;
    return;
  }
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
};
routerInit();
