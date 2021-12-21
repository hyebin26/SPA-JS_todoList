const CollectionTask = (task, idx, setDone) => {
  const clickTaskBtn = (e) => {
    // done으로 이동하게 하기
    // task 삭제
    console.log(setDone, "setdone");
    // task는 update
    // done은 update
    console.log(e.target.parentNode);
  };
  window.handleClickTaskBtn = clickTaskBtn;
  return `
  <li class="collectionTodoList" data-id=${task.taskId}>
    <button class="collectionTaskBtn" onclick="handleClickTaskBtn(event)"> </button>
    <p>${task.content}</p>
  </li>
  `;
};
export default CollectionTask;
