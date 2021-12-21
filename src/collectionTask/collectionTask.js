const CollectionTask = (task, idx) => {
  const clickTaskBtn = () => {};
  window.handleClickTaskBtn = clickTaskBtn;
  return `
  <li class="collectionTodoList" data-id=${idx}>
    <button class="collectionTaskBtn" click="handleClickTaskBtn()"> </button>
    <p>${task}</p>
  </li>
  `;
};
export default CollectionTask;
