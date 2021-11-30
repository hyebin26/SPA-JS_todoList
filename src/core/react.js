export const MyReact = {
  options: {
    currentStateKey: 0,
    renderCount: 0,
    states: [],
    root: null,
    rootComponent: null,
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
  render: (component, root) => {
    console.log("render!!!!!!");
    MyReact.options.root = root ? root : MyReact.options.root;
    MyReact.options.rootComponent = component
      ? component
      : MyReact.options.rootComponent;
    root.innerHTML = MyReact.options.rootComponent();
    MyReact.options.currentStateKey = 0;
  },
};
