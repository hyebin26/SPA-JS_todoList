## 📝프로젝트 소개

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

React Router의 Link를 구현한 것입니다. 우선 SPA는 페이지를 이동할 때 새로고침이 일어나면 안되므로 `e.preventDefault()` 로 a태그의 새로고침을 방지합니다. 그리고 첫 번째 매개변수인 `to` 로 이동할 페이지의 값을 받고, a태그의 `href=`${to}``에 값을 넣고 a태그를 클릭할 경우 history API를 사용해 url을 변경하고 현재 보여지고 있는 컴포넌트의 상태 값을 초기화하고 렌더함수를 호출합니다.

### 4. 소셜로그인

이미지 :<a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>
참고:[https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#\_2-동시에-여러-setstate가-실행될-경우](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Make-useSate-hook/#_1-react%E1%84%8B%E1%85%B4-usestate)
