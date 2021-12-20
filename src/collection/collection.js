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
    const collectionId = e.target.parentNode.dataset.id;
    const collectionValue = e.target.nextSibling.textContent;
    const collectionCompleteTitle = document.querySelector(
      ".collectionCompleteTitle"
    );
    const completeLength = document.querySelectorAll(
      ".collectionCompleteList"
    ).length;
    const collectionUl = document.querySelector(".collectionComplete");
    const addedCollectionLi = document.createElement("li");
    const addedCollectionBtn = document.createElement("button");
    const addedCollectionP = document.createElement("p");
    // contentComLi.dataset.id = comLength;

    addedCollectionP.textContent = collectionValue;
    addedCollectionBtn.textContent = "✓";
    addedCollectionBtn.className = "completeBtn";
    addedCollectionLi.className = "collectionCompleteList";
    collectionCompleteTitle.textContent = `Completed - ${completeLength + 1}`;

    // contentTaskTitle.textContent = `Tasks - ${contentTaskLength - 1}`;
    // ContentModel.complete[comLength] = comText;
    // delete ContentModel.task[comId];
    addedCollectionLi.append(addedCollectionBtn, addedCollectionP);
    collectionUl.append(addedCollectionLi);

    // contentComBtn.addEventListener("click", ContentController.addTodo);
    // e.target.parentNode.remove();
  },
};

const Collection = (props) => {
  // contentSettingBtn.addEventListener(
  //   "click",
  //   ContentController.clickContentSettingBtn
  // );
  // contentSettingBtn.addEventListener("blur", ContentController.blurSettignBox);
  // contentEditBtn.addEventListener("click", ContentController.clickContentPopup);
  // contentTodoForm.addEventListener("submit", ContentController.addTodo);
  window.handleTaskBtn = ContentController.clickTaskBtn;
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
      <h3 class="collectionTaskTitle" >Tasks - 0</h3>
      <ul class="collectionTodo"></ul>
      <form onsubmit="handleCollectionAdd(event)">
        <button>+</button>
        <input placeholder="Add task" type="text"> 
      </form>
    </div>
    <div class="collectionComBox">
      <h3 class="collectionCompleteTitle"></h3>
      <ul class="collectionComplete"></ul>
    </div>
  </section>
  `;
};

export default Collection;
