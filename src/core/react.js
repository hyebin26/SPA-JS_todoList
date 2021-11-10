function useState(initState) {
  let state = initState;
  const setState = (newState) => {
    state = newState;
    render();
  };
  return [state, setState];
}
