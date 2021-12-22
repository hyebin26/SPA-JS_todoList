const debounceFrame = (callback) => {
  let nextFrameCallback = 0;
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
};

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
  _render: debounceFrame(() => {
    const { root, rootComponent } = MyReact.options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();
    MyReact.options.currentStateKey = 0;
    const url = new URL(window.location.href);
    console.log(url.pathname);
  }),
  render: (rootComponent, root) => {
    MyReact.options.root = root;
    MyReact.options.rootComponent = rootComponent;
    MyReact._render();
  },
};
