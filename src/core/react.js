import RenderHTML from "../index.js";

export const MyReact = {
  options: {
    currentStateKey: 0,
    renderCount: 0,
    states: [],
    root: null,
    rootComponent: null,
  },
  useState: (initState) => {
    const key = currentStateKey;
    if (states.length === currentStateKey) {
      states.push(initState);
    }
    const state = states[key];
    const setState = (newState) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;
      states[key] = newState;
      render();
    };
    currentStateKey += 1;
    return [state, setState];
  },
  render: (component, root) => {
    MyReact.options.root = root;
    MyReact.options.rootComponent = component;
    MyReact.options.root.innerHTML = MyReact.options.rootComponent();
    MyReact.options.currentStateKey = 0;
  },
};
