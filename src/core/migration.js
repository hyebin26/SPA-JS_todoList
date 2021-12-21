const addCollectionTask = () => {
  e.preventDefault();
  // submit했을 경우 database추가
  // collectionjs리렌더링 되게 ?
  const type = e.type;
  const addTodo = document.querySelector(".collectionTodo");
  const addTaskCnt = document.querySelectorAll(".collectionTodoList");
  const taskId = Object.keys(ContentModel.task).length;
  const addTaskTitle = document.querySelector(".collectionTaskTitle");
  const todoList = document.createElement("li");
  const taskBtn = document.createElement("button");
  const taskText = document.createElement("p");

  todoList.className = "collectionTodoList";
  taskBtn.className = "collectionTaskBtn";
  addTaskTitle.textContent = `Tasks - ${addTaskCnt.length + 1}`;
  taskBtn.textContent = " ";
  todoList.dataset.id = taskId;
  taskBtn.addEventListener("click", ContentController.clickTaskBtn);
  todoList.append(taskBtn, taskText);
  addTodo.append(todoList);
  if (type === "submit") {
    if (e.target[1].value !== "" && e.target[1].value[0] !== " ") {
      taskText.textContent = e.target[1].value;
      ContentModel.task[taskId] = e.target[1].value;
      e.target[1].value = "";
    }
  } //
  else {
    const addCompleteTitle = document.querySelector(".contentCompleteTitle");
    const addCompleteLength = document.querySelectorAll(
      ".contentCompleteList"
    ).length;

    addCompleteTitle.textContent = `Completed -${addCompleteLength - 1}`;
    taskText.textContent = e.target.nextSibling.textContent;

    ContentModel.task[addTaskCntLength] = e.target.nextSibling.textContent;
    e.target.parentNode.remove();
    delete ContentModel.complete[e.target.parentNode.dataset.id];
  }
};
