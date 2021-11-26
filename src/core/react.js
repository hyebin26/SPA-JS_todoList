const states = [];
let currentStateKey = 0;

function useState(initState) {
  if (states.length === currentStateKey) {
    states.push(initState);
  }
  const state = states[currentStateKey];
  const setState = (newState) => {
    console.log(currentStateKey, states);
    states[currentStateKey] = newState;
    render();
  };
  console.log("cs", currentStateKey);
  currentStateKey += 1;

  return [state, setState];
}

function Counter() {
  const [count, setCount] = useState(1);
  window.increment = () => setCount(count + 1);
  return `
    <div>
      <strong>count: ${count} </strong>
      <button onclick="increment()">증가</button>
    </div>
  `;
}

function Cat() {
  const [cat, setCat] = useState("고양이");
  window.meow = () => setCat(cat + " 야옹!");
  return `
    <div>
      <strong>${cat}</strong>
      <button onclick="meow()">고양이의 울음소리</button>
    </div>
  `;
}

function render() {
  const app = document.getElementById("root");
  app.innerHTML = `
    <div>
      ${Counter()}
      ${Cat()}
    </div>
      `;
  currentStateKey = 0;
}
render();
