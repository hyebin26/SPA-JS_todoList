## 📝프로젝트 소개

- [https://www.hyebin-todo.site/](https://www.hyebin-todo.site/)
- React와 Javascript에 대해서 좀 더 깊게 이해하기 위해 Vanilla Javascript로 만든 SPA 투두리스트입니다.
- 소셜 로그인, 로그인, 회원가입을 성공하면 collection을 설정하고 투두리스트를 작성할 수 있습니다.
- 데이터베이스는 Mysql을 사용했고 배포는 AWS EC2를 이용했습니다.

## 🔔사용한 기술

- Javascript
- Express
- Mysql
- AWS EC2
- Jsonwebtoken
- Axios

## 📷주요 기능

### 1. useState

```jsx
const MyReact = {
  options: {
    currentStateKey: 0,
    states: [],
  },
  useState: (initState) => {
    const key = MyReact.options.currentStateKey;
    if (MyReact.options.states.length === MyReact.options.currentStateKey) {
      MyReact.options.states.push(initState);
    }
    const state = MyReact.options.states[key];
    const setState = (newState) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;
      MyReact.options.states[key] = newState;
      MyReact.render(MyReact.options.rootComponent, MyReact.options.root);
    };
    MyReact.options.currentStateKey += 1;
    return [state, setState];
  },
};
```

useState는 리액트에서 사용할 수 있는 상태 관리 훅입니다. 구현한 방법은 우선 해당 상태값을 계속해서 `setState`를 이용해서 사용하므로 `states`라는 배열에 호출한 순서대로 넣고 순서에 알맞게 호출하기 위해 `currentStateKey` 를 사용합니다. `setState`는 클로저를 이용해서 구현했습니다. 클로저로 `state`의 값과 `key`값에 접근하여 이전의 상태값과 매개변수로 들어온 `newState`값이 같지 않다면 `states[key] = newState` 로 상태 값을 변경하고 렌더함수를 호출합니다.

참고: [https://github.com/hyebin26/JsStudy/blob/main/JS/클로저.md](https://github.com/hyebin26/JsStudy/blob/main/JS/%ED%81%B4%EB%A1%9C%EC%A0%80.md)

### 2. Render

```jsx
const debounceFrame = (callback) => {
  let nextFrameCallback = 0;
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
};
const MyReact = {
  options: {
    root: null,
    rootComponent: null,
  },
  _render: debounceFrame(() => {
    const { root, rootComponent } = MyReact.options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    MyReact.options.currentStateKey = 0;
  }),
  render: (rootComponent, root) => {
    MyReact.options.root = root;
    MyReact.options.rootComponent = rootComponent;
    MyReact._render();
  },
};
```

Render는 `MyReact.render(App, document.querySelector("#root"))` 처럼 첫 번째 인자에는 렌더되는 컴포넌트, 두 번째 인자에는 컴포넌트를 렌더할 요소를 입력하여 호출합니다. 그리고 렌더될 때 마다 `useState` 에서 순서를 정할 때 사용되는`currentStateKey`를 초기화하여 기존의 존재하는 상태들을 유지합니다. 그리고 한 함수에서 `useState` 가 여러번 호출되었을 때 컴포넌트를 최대한 적게 렌더링하기 위해 이벤트 제어방법인 디바운싱을 `requestAnimationFrame` 사용해서 구현했습니다.

참고: [https://github.com/hyebin26/JsStudy/blob/main/JS/requestAnimationFrame().md](<https://github.com/hyebin26/JsStudy/blob/main/JS/requestAnimationFrame().md>)

### 3. Link

```jsx
export const Link = ({ to, content, state }) => {
  window.onClickAtag = (e) => {
    e.preventDefault();
    const root = document.getElementById("root");
    history.pushState(state ? state : null, "", e.currentTarget.href);
    MyReact.render(App, root);
    MyReact.options.states = [];
    window.addEventListener("popstate", () => {
      MyReact.options.states = [];
      MyReact.render(App, root);
    });
  };

  return `<a onclick="onClickAtag(event)" href="${to}" >${content}</a>`;
};
```

React Router의 Link를 구현한 것입니다. 우선 SPA는 페이지를 이동할 때 새로고침이 일어나면 안되므로 `e.preventDefault()` 로 a태그의 새로고침을 방지합니다. 그리고 첫 번째 매개변수인 `to` 로 이동할 페이지의 값을 받고, a태그의 `href=`${to}``에 값을 넣고 a태그를 클릭할 경우 history API를 사용해 url을 변경하고 현재 보여지고 있는 컴포넌트의 상태 값을 초기화하고 렌더함수를 호출합니다. 그리고 window에 `popstate`이벤트 리스너를 추가해서 이벤트가 호출되면 상태를 초기화하고 렌더함수를 호출합니다.

### 4. 소셜로그인

```jsx
window.clickKakaoBtn = async (e) => {
  try {
    const fetchKakaoBtn = await axios(`/kakao/auth`);
    const { kakaoAuthURL } = await fetchKakaoBtn.data;
    location.href = kakaoAuthURL;
  } catch (err) {
    console.log(err);
  }
};
```

소셜로그인은 REST API를 이용해서 네이버,카카오를 구현했습니다. 카카오 소셜로그인을 구현한 순서를 보면

1. 카카오 버튼을 클릭하면 `/kakao/auth/`로 요청을 보냅니다.
2. 서버는 카카오 서버에 요청을 보내고 로그인을 할 수 있는 URL을 프론트에게 보내줍니다.
3. 프론트에서는 응답을 받고 로그인을 할 수 있는 URL로 라우팅을 시킵니다.
4. 로그인을 성공하면 설정한 Redirect_uri로 인가코드가 담긴 쿼리 스트링을 포함하여 이동시킵니다.
5. 프론트에서는 인가코드를 서버 `/social/token` 로 보냅니다.
6. 서버는 인가코드를 카카오 서버에 보내고 토큰을 받고 다시 토큰을 카카오 서버에 보내서 사용자의 아이디를 받습니다.
7. 해당 아이디가 DB에 존재하면 `needSignup`을 false, 존재하지 않으면 true를 프론트에 보내줍니다.
8. 프론트에서는 `needSignup` 이 false일 경우 `/main` 으로 true일 경우 `/signup` 으로 라우팅시킵니다.

### 5. Router

```jsx
export const Router = {
  push: (link, state) => {
    MyReact.render(App, document.querySelector("#root"));
    MyReact.options.states = [];
    history.pushState({ ...state }, "", link);
  },
};
```

Router.push는 페이지를 해당 URL로 라우팅 시킬 수 있습니다. 처음에 구현하고자 한 것은 URL의 변경을 감지해서 렌더함수를 호출하는 방식이었습니다. 하지만 그런 이벤트 리스너가 없고 DOM의 변경을 감지하는 `MutationObserver`만 존재하기 때문에 매개변수 `link` 로, 라우팅을 시킬 URL을 받고 `history.pushState`로 URL을 변경하고 렌더함수를 호출하는 방식으로 구현했습니다.

참고:[https://stackoverflow.com/questions/32148423/how-to-use-or-is-it-possible-mutationobserver-to-monitor-window-location-pathn](https://stackoverflow.com/questions/32148423/how-to-use-or-is-it-possible-mutationobserver-to-monitor-window-location-pathn)

### 6. JsonWebToken을 이용한 로그인

```jsx
try{
  const loginData = await axios.post("/login", { uid, pwd });
  const { access_token } = loginData.data;
    if (access_token) {
  falseLogin.textContent = "";
  localStorage.setItem("uid", uid);
  localStorage.setItem("access_token", access_token);
  Router.push("/main");
}
```

로그인을 할 때 JWT를 사용해서 토큰 방식으로 구현했습니다. 서버에 유저의 아이디와 패스워드를 보내고 Database에 정보가 존재할 경우 `refreshToken`과 `accessToken`을 만들고 `refreshToken`은 `accessToken`의 재발급을 위해 Database에 아이디와 함께 저장을 합니다. 그리고 `accessToken`은 프론트에 보내주고 프론트에서는 API를 요청할 때 마다 쿠키를 이용해서 `accessToken`을 보내고 서버에서는 토큰이 유효한 토큰이면 API요청을 응답합니다. `accessToken`이 만료되었지만 `refreshToken`이 Database에 존재할 경우에는 `accessToken`을 다시 만들어서 보내고 API에 응답하는 방식으로 구현했습니다.

## **🤠**후기

1. **리액트의 소중하다.**

이번 프로젝트를 통해 그 동안 간단하게 CRA로 시작한 리액트 프로젝트에 대해서 소중함을 느낄 수 있었습니다. 구현하는 것도 React의 소스코드를 참고해서 구현하려고 했으나 복잡해서 여러 블로그를 참고해서 구현할 수 있었습니다. 하지만 리액트의 여러 정보를 찾으면서 리액트의 렌더링과 여러 함수들의 구조에 대해서 조금이라도 이해할 수 있게 되었습니다.

2. **AWS는 복잡하다.**

처음으로 AWS를 이용해서 배포를 하였는데 알아야 github, heroku를 이용해서 배포할 때 보다 알아야 할 내용이 많아서 복잡했습니다. 천천히 하나씩 이해하면서 EC2를 이용하고, 가비아에서 도메인을 구입해서 로드밸런싱을 통해 HTTPS로 무사히 배포할 수 있었습니다.

참고: [https://github.com/hyebin26/JsStudy/tree/main/aws](https://github.com/hyebin26/JsStudy/tree/main/aws)

3. **프로젝트를 통해 알게된 것들**

참고: [https://github.com/hyebin26/JsStudy/blob/main/JS/SPA-todoList구현하고...md](https://github.com/hyebin26/JsStudy/blob/main/JS/SPA-todoList%EA%B5%AC%ED%98%84%ED%95%98%EA%B3%A0...md)

## 참고

이미지 :<a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>

참고:[https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#\_2-동시에-여러-setstate가-실행될-경우](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#_1-react%E1%84%8B%E1%85%B4-usestate)
