## ๐ํ๋ก์ ํธ ์๊ฐ

- [https://www.hyebin-todo.site/](https://www.hyebin-todo.site/)
- React์ Javascript์ ๋ํด์ ์ข ๋ ๊น๊ฒ ์ดํดํ๊ธฐ ์ํด Vanilla Javascript๋ก ๋ง๋  SPA ํฌ๋๋ฆฌ์คํธ์๋๋ค.
- ์์ ๋ก๊ทธ์ธ, ๋ก๊ทธ์ธ, ํ์๊ฐ์์ ์ฑ๊ณตํ๋ฉด collection์ ์ค์ ํ๊ณ  ํฌ๋๋ฆฌ์คํธ๋ฅผ ์์ฑํ  ์ ์์ต๋๋ค.
- ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ Mysql์ ์ฌ์ฉํ๊ณ  ๋ฐฐํฌ๋ AWS EC2๋ฅผ ์ด์ฉํ์ต๋๋ค.

## ๐์ฌ์ฉํ ๊ธฐ์ 

- Javascript
- Express
- Mysql
- AWS EC2
- Jsonwebtoken
- Axios

## ๐ท์ฃผ์ ๊ธฐ๋ฅ

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

useState๋ ๋ฆฌ์กํธ์์ ์ฌ์ฉํ  ์ ์๋ ์ํ ๊ด๋ฆฌ ํ์๋๋ค. ๊ตฌํํ ๋ฐฉ๋ฒ์ ์ฐ์  ํด๋น ์ํ๊ฐ์ ๊ณ์ํด์ `setState`๋ฅผ ์ด์ฉํด์ ์ฌ์ฉํ๋ฏ๋ก `states`๋ผ๋ ๋ฐฐ์ด์ ํธ์ถํ ์์๋๋ก ๋ฃ๊ณ  ์์์ ์๋ง๊ฒ ํธ์ถํ๊ธฐ ์ํด `currentStateKey` ๋ฅผ ์ฌ์ฉํฉ๋๋ค. `setState`๋ ํด๋ก์ ๋ฅผ ์ด์ฉํด์ ๊ตฌํํ์ต๋๋ค. ํด๋ก์ ๋ก `state`์ ๊ฐ๊ณผ `key`๊ฐ์ ์ ๊ทผํ์ฌ ์ด์ ์ ์ํ๊ฐ๊ณผ ๋งค๊ฐ๋ณ์๋ก ๋ค์ด์จ `newState`๊ฐ์ด ๊ฐ์ง ์๋ค๋ฉด `states[key] = newState` ๋ก ์ํ ๊ฐ์ ๋ณ๊ฒฝํ๊ณ  ๋ ๋ํจ์๋ฅผ ํธ์ถํฉ๋๋ค.

์ฐธ๊ณ : [https://github.com/hyebin26/JsStudy/blob/main/JS/ํด๋ก์ .md](https://github.com/hyebin26/JsStudy/blob/main/JS/%ED%81%B4%EB%A1%9C%EC%A0%80.md)

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

Render๋ `MyReact.render(App, document.querySelector("#root"))` ์ฒ๋ผ ์ฒซ ๋ฒ์งธ ์ธ์์๋ ๋ ๋๋๋ ์ปดํฌ๋ํธ, ๋ ๋ฒ์งธ ์ธ์์๋ ์ปดํฌ๋ํธ๋ฅผ ๋ ๋ํ  ์์๋ฅผ ์๋ ฅํ์ฌ ํธ์ถํฉ๋๋ค. ๊ทธ๋ฆฌ๊ณ  ๋ ๋๋  ๋ ๋ง๋ค `useState` ์์ ์์๋ฅผ ์ ํ  ๋ ์ฌ์ฉ๋๋`currentStateKey`๋ฅผ ์ด๊ธฐํํ์ฌ ๊ธฐ์กด์ ์กด์ฌํ๋ ์ํ๋ค์ ์ ์งํฉ๋๋ค. ๊ทธ๋ฆฌ๊ณ  ํ ํจ์์์ `useState` ๊ฐ ์ฌ๋ฌ๋ฒ ํธ์ถ๋์์ ๋ ์ปดํฌ๋ํธ๋ฅผ ์ต๋ํ ์ ๊ฒ ๋ ๋๋งํ๊ธฐ ์ํด ์ด๋ฒคํธ ์ ์ด๋ฐฉ๋ฒ์ธ ๋๋ฐ์ด์ฑ์ `requestAnimationFrame` ์ฌ์ฉํด์ ๊ตฌํํ์ต๋๋ค.

์ฐธ๊ณ : [https://github.com/hyebin26/JsStudy/blob/main/JS/requestAnimationFrame().md](<https://github.com/hyebin26/JsStudy/blob/main/JS/requestAnimationFrame().md>)

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

React Router์ Link๋ฅผ ๊ตฌํํ ๊ฒ์๋๋ค. ์ฐ์  SPA๋ ํ์ด์ง๋ฅผ ์ด๋ํ  ๋ ์๋ก๊ณ ์นจ์ด ์ผ์ด๋๋ฉด ์๋๋ฏ๋ก `e.preventDefault()` ๋ก aํ๊ทธ์ ์๋ก๊ณ ์นจ์ ๋ฐฉ์งํฉ๋๋ค. ๊ทธ๋ฆฌ๊ณ  ์ฒซ ๋ฒ์งธ ๋งค๊ฐ๋ณ์์ธ `to` ๋ก ์ด๋ํ  ํ์ด์ง์ ๊ฐ์ ๋ฐ๊ณ , aํ๊ทธ์ `href=`${to}``์ ๊ฐ์ ๋ฃ๊ณ  aํ๊ทธ๋ฅผ ํด๋ฆญํ  ๊ฒฝ์ฐ history API๋ฅผ ์ฌ์ฉํด url์ ๋ณ๊ฒฝํ๊ณ  ํ์ฌ ๋ณด์ฌ์ง๊ณ  ์๋ ์ปดํฌ๋ํธ์ ์ํ ๊ฐ์ ์ด๊ธฐํํ๊ณ  ๋ ๋ํจ์๋ฅผ ํธ์ถํฉ๋๋ค. ๊ทธ๋ฆฌ๊ณ  window์ `popstate`์ด๋ฒคํธ ๋ฆฌ์ค๋๋ฅผ ์ถ๊ฐํด์ ์ด๋ฒคํธ๊ฐ ํธ์ถ๋๋ฉด ์ํ๋ฅผ ์ด๊ธฐํํ๊ณ  ๋ ๋ํจ์๋ฅผ ํธ์ถํฉ๋๋ค.

### 4. ์์๋ก๊ทธ์ธ

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

์์๋ก๊ทธ์ธ์ REST API๋ฅผ ์ด์ฉํด์ ๋ค์ด๋ฒ,์นด์นด์ค๋ฅผ ๊ตฌํํ์ต๋๋ค. ์นด์นด์ค ์์๋ก๊ทธ์ธ์ ๊ตฌํํ ์์๋ฅผ ๋ณด๋ฉด

1. ์นด์นด์ค ๋ฒํผ์ ํด๋ฆญํ๋ฉด `/kakao/auth/`๋ก ์์ฒญ์ ๋ณด๋๋๋ค.
2. ์๋ฒ๋ ์นด์นด์ค ์๋ฒ์ ์์ฒญ์ ๋ณด๋ด๊ณ  ๋ก๊ทธ์ธ์ ํ  ์ ์๋ URL์ ํ๋ก ํธ์๊ฒ ๋ณด๋ด์ค๋๋ค.
3. ํ๋ก ํธ์์๋ ์๋ต์ ๋ฐ๊ณ  ๋ก๊ทธ์ธ์ ํ  ์ ์๋ URL๋ก ๋ผ์ฐํ์ ์ํต๋๋ค.
4. ๋ก๊ทธ์ธ์ ์ฑ๊ณตํ๋ฉด ์ค์ ํ Redirect_uri๋ก ์ธ๊ฐ์ฝ๋๊ฐ ๋ด๊ธด ์ฟผ๋ฆฌ ์คํธ๋ง์ ํฌํจํ์ฌ ์ด๋์ํต๋๋ค.
5. ํ๋ก ํธ์์๋ ์ธ๊ฐ์ฝ๋๋ฅผ ์๋ฒ `/social/token` ๋ก ๋ณด๋๋๋ค.
6. ์๋ฒ๋ ์ธ๊ฐ์ฝ๋๋ฅผ ์นด์นด์ค ์๋ฒ์ ๋ณด๋ด๊ณ  ํ ํฐ์ ๋ฐ๊ณ  ๋ค์ ํ ํฐ์ ์นด์นด์ค ์๋ฒ์ ๋ณด๋ด์ ์ฌ์ฉ์์ ์์ด๋๋ฅผ ๋ฐ์ต๋๋ค.
7. ํด๋น ์์ด๋๊ฐ DB์ ์กด์ฌํ๋ฉด `needSignup`์ false, ์กด์ฌํ์ง ์์ผ๋ฉด true๋ฅผ ํ๋ก ํธ์ ๋ณด๋ด์ค๋๋ค.
8. ํ๋ก ํธ์์๋ `needSignup` ์ด false์ผ ๊ฒฝ์ฐ `/main` ์ผ๋ก true์ผ ๊ฒฝ์ฐ `/signup` ์ผ๋ก ๋ผ์ฐํ์ํต๋๋ค.

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

Router.push๋ ํ์ด์ง๋ฅผ ํด๋น URL๋ก ๋ผ์ฐํ ์ํฌ ์ ์์ต๋๋ค. ์ฒ์์ ๊ตฌํํ๊ณ ์ ํ ๊ฒ์ URL์ ๋ณ๊ฒฝ์ ๊ฐ์งํด์ ๋ ๋ํจ์๋ฅผ ํธ์ถํ๋ ๋ฐฉ์์ด์์ต๋๋ค. ํ์ง๋ง ๊ทธ๋ฐ ์ด๋ฒคํธ ๋ฆฌ์ค๋๊ฐ ์๊ณ  DOM์ ๋ณ๊ฒฝ์ ๊ฐ์งํ๋ `MutationObserver`๋ง ์กด์ฌํ๊ธฐ ๋๋ฌธ์ ๋งค๊ฐ๋ณ์ `link` ๋ก, ๋ผ์ฐํ์ ์ํฌ URL์ ๋ฐ๊ณ  `history.pushState`๋ก URL์ ๋ณ๊ฒฝํ๊ณ  ๋ ๋ํจ์๋ฅผ ํธ์ถํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํ์ต๋๋ค.

์ฐธ๊ณ :[https://stackoverflow.com/questions/32148423/how-to-use-or-is-it-possible-mutationobserver-to-monitor-window-location-pathn](https://stackoverflow.com/questions/32148423/how-to-use-or-is-it-possible-mutationobserver-to-monitor-window-location-pathn)

### 6. JsonWebToken์ ์ด์ฉํ ๋ก๊ทธ์ธ

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

๋ก๊ทธ์ธ์ ํ  ๋ JWT๋ฅผ ์ฌ์ฉํด์ ํ ํฐ ๋ฐฉ์์ผ๋ก ๊ตฌํํ์ต๋๋ค. ์๋ฒ์ ์ ์ ์ ์์ด๋์ ํจ์ค์๋๋ฅผ ๋ณด๋ด๊ณ  Database์ ์ ๋ณด๊ฐ ์กด์ฌํ  ๊ฒฝ์ฐ `refreshToken`๊ณผ `accessToken`์ ๋ง๋ค๊ณ  `refreshToken`์ `accessToken`์ ์ฌ๋ฐ๊ธ์ ์ํด Database์ ์์ด๋์ ํจ๊ป ์ ์ฅ์ ํฉ๋๋ค. ๊ทธ๋ฆฌ๊ณ  `accessToken`์ ํ๋ก ํธ์ ๋ณด๋ด์ฃผ๊ณ  ํ๋ก ํธ์์๋ API๋ฅผ ์์ฒญํ  ๋ ๋ง๋ค ์ฟ ํค๋ฅผ ์ด์ฉํด์ `accessToken`์ ๋ณด๋ด๊ณ  ์๋ฒ์์๋ ํ ํฐ์ด ์ ํจํ ํ ํฐ์ด๋ฉด API์์ฒญ์ ์๋ตํฉ๋๋ค. `accessToken`์ด ๋ง๋ฃ๋์์ง๋ง `refreshToken`์ด Database์ ์กด์ฌํ  ๊ฒฝ์ฐ์๋ `accessToken`์ ๋ค์ ๋ง๋ค์ด์ ๋ณด๋ด๊ณ  API์ ์๋ตํ๋ ๋ฐฉ์์ผ๋ก ๊ตฌํํ์ต๋๋ค.

## **๐ค **ํ๊ธฐ

1. **REACT SPA**

์ด๋ฒ ํ๋ก์ ํธ๋ฅผ ํตํด ๊ทธ ๋์ ๊ฐ๋จํ๊ฒ CRA๋ก ์์ํ ๋ฆฌ์กํธ ํ๋ก์ ํธ์ ๋ํด์ ์์คํจ์ ๋๋ ์ ์์์ต๋๋ค. ๊ตฌํํ๋ ๊ฒ๋ React์ ์์ค์ฝ๋๋ฅผ ์ฐธ๊ณ ํด์ ๊ตฌํํ๋ ค๊ณ  ํ์ผ๋ ๋ณต์กํด์ ์ฌ๋ฌ ๋ธ๋ก๊ทธ๋ฅผ ์ฐธ๊ณ ํด์ ๊ตฌํํ  ์ ์์์ต๋๋ค. ํ์ง๋ง ๋ฆฌ์กํธ์ ์ฌ๋ฌ ์ ๋ณด๋ฅผ ์ฐพ์ผ๋ฉด์ ๋ฆฌ์กํธ์ ๋ ๋๋ง๊ณผ ์ฌ๋ฌ ํจ์๋ค์ ๊ตฌ์กฐ์ ๋ํด์ ์กฐ๊ธ์ด๋ผ๋ ์ดํดํ  ์ ์๊ฒ ๋์์ต๋๋ค.

2. **AWS EC2๋ฅผ ์ด์ฉํ ๋ฐฐํฌ**

์ฒ์์ผ๋ก AWS๋ฅผ ์ด์ฉํด์ ๋ฐฐํฌ๋ฅผ ํ์๋๋ฐ github, heroku๋ฅผ ์ด์ฉํด์ ๋ฐฐํฌํ  ๋ ๋ณด๋ค ์์์ผ ํ  ๋ด์ฉ์ด ๋ง์์ ๋ณต์กํ์ต๋๋ค. ์ฒ์ฒํ ํ๋์ฉ ์ ๋ฆฌํด๊ฐ๋ฉด์ EC2๋ฅผ ์ด์ฉํ๊ณ , ๊ฐ๋น์์์ ๋๋ฉ์ธ์ ๊ตฌ์ํด์ ELB(Elastic Load Balancing)์ ํตํด HTTPS๋ก ๋ฌด์ฌํ ๋ฐฐํฌํ  ์ ์์์ต๋๋ค.

์ฐธ๊ณ : [https://github.com/hyebin26/JsStudy/tree/main/aws](https://github.com/hyebin26/JsStudy/tree/main/aws)

3. **ํ๋ก์ ํธ๋ฅผ ํตํด ์๊ฒ๋ ๊ฒ๋ค**

์ฐธ๊ณ : [https://github.com/hyebin26/JsStudy/blob/main/JS/SPA-todoList๊ตฌํํ๊ณ ...md](https://github.com/hyebin26/JsStudy/blob/main/JS/SPA-todoList%EA%B5%AC%ED%98%84%ED%95%98%EA%B3%A0...md)

## ์ฐธ๊ณ 

์ด๋ฏธ์ง :<a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>

์ฐธ๊ณ :[https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#\_2-แแฉแผแแตแแฆ-แแงแแฅ-setstateแแก-แแตแฏแแขแผแแฌแฏ-แแงแผแแฎ](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#_1-react%E1%84%8B%E1%85%B4-usestate)
