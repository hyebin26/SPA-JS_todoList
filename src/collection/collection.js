import Header from "../header/header.js";
import Popup from "../popup/popup.js";

const ContentModel = {
  task: {},
  complete: {},
};

const ContentController = {
  clickContentSettingBtn: () => {
    const clickSettingBox = document.querySelector(".settingBox");
    clickSettingBox.classList.toggle("activeS");
  },
  addTodo: (e) => {
    e.preventDefault();
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
  },
  //
  //
  clickCompleteBtn: (e) => {
    console.log(e);
  },
  clickContentEditBtn: () => {
    const clickContentPopup = document.querySelector(".popupContainer");
    clickContentPopup.classList.add("activeP");
  },
  blurSettignBox: () => {
    const blurSettingBox = document.querySelector(".settingBox");
    setTimeout(() => {
      blurSettingBox.classList.remove("activeS");
    }, 100);
  },

  clickTaskBtn: (e) => {
    const contentComBox = document.querySelector(".contentComBox");
    const contentComUl = document.querySelector(".contentComplete");
    const contentComTitle = document.querySelector(".contentCompleteTitle");
    const contentComLi = document.createElement("li");
    const contentComP = document.createElement("p");
    const contentComBtn = document.createElement("button");
    const comText = e.target.nextSibling.innerText;
    const comId = e.target.parentNode.dataset.id;
    const comLength = document.querySelectorAll(".contentCompleteList").length;
    const contentTaskTitle = document.querySelector(".contentTaskTitle");
    const contentTaskLength =
      document.querySelectorAll(".contentTodoList").length;

    contentComP.textContent = comText;
    contentComLi.dataset.id = comLength;

    contentComTitle.textContent = `Completed - ${comLength + 1}`;
    contentComBtn.textContent = "✓";
    contentComBtn.className = "completeBtn";
    contentComLi.className = "contentCompleteList";
    contentTaskTitle.textContent = `Tasks - ${contentTaskLength - 1}`;

    contentComBox.append(contentComTitle, contentComUl);
    contentComLi.append(contentComBtn, contentComP);
    contentComUl.append(contentComLi);

    ContentModel.complete[comLength] = comText;
    delete ContentModel.task[comId];

    contentComBtn.addEventListener("click", ContentController.addTodo);
    e.target.parentNode.remove();
  },
};

const Collection = () => {
  // contentSettingBtn.addEventListener(
  //   "click",
  //   ContentController.clickContentSettingBtn
  // );
  // contentSettingBtn.addEventListener("blur", ContentController.blurSettignBox);
  // contentEditBtn.addEventListener("click", ContentController.clickContentPopup);
  // contentTodoForm.addEventListener("submit", ContentController.addTodo);
  window.handleContentSettingBtn = ContentController.clickContentSettingBtn;
  window.handleCollectionAdd = ContentController.addTodo;
  window.handleEditCollectionBtn = ContentController.clickContentEditBtn;
  return `
  ${Header()}
  ${Popup()}
  <section class="collectionSection">
    <div class="collectionTitleBox">
      <a>﹤</a>
      <h2>학교</h2>
      <button class="collectionSettingBtn" onclick="handleContentSettingBtn()">···</button>
      <div class="settingBox">
        <button class="settingEdit" onclick="handleEditCollectionBtn()">Edit Collection</button>
        <button class="settingDelete">Delete Collection</button>
      </div>
    </div>
    <div class="collectionTodoBox">
      <h3 class="collectionTaskTitle">Tasks - 0</h3>
      <ul class="collectionTodo"></ul>
      <form onsubmit="handleCollectionAdd(event)">
        <button>+</button>
        <input placeholder="Add task" type="text"> 
      </form>
    </div>
    <div class="collectionComBox">
      <ul class="collectionComplete"></ul>
      <h3 class="collectionCompleteTitle"></h3>
    </div>
  </section>
  `;
};

export default Collection;
