let state = undefined;

function useState(initState) {
  if (state === undefined) {
    state = initState;
  }
  const setState = (newState) => {
    state = newState;
    render();
  };
  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(1);
  window.increment = () => {
    setCount(count + 1);
  };

  return `
    <div>
      <h3>count: ${count} </h3>
      <button onclick="increment()">증가</button>
    </div>
  `;
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <div>
      ${Counter()}
    </div>
  `;
}
render();
