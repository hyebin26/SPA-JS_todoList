const ContentModel = {
  task: {},
  complete: {},
};

const ContentController = {
  clickCompleteBtn: (e) => {
    console.log(e);
  },
  clickContentPopup: () => {
    const clickContentPopup = document.querySelector(".popupContainer");
    clickContentPopup.classList.add("activeP");
  },
  blurSettignBox: () => {
    const blurSettingBox = document.querySelector(".settingBox");
    setTimeout(() => {
      blurSettingBox.classList.remove("activeS");
    }, 100);
  },
  clickContentSettingBtn: () => {
    const clickSettingBox = document.querySelector(".settingBox");
    clickSettingBox.classList.toggle("activeS");
  },
  clickContentPopup: () => {
    const clickContentPopup = document.querySelector(".popupContainer");
    clickContentPopup.classList.add("activeP");
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
  addTodo: (e) => {
    e.preventDefault();
    const type = e.type;
    const addTodo = document.querySelector(".contentTodo");
    const addTaskCnt = document.querySelectorAll(".contentTodoList");
    const taskId = Object.keys(ContentMode.task).length;
    const addTaskTitle = document.querySelector(".contentTaskTitle");
    const todoList = document.createElement("li");
    const taskBtn = document.createElement("button");
    const taskText = document.createElement("p");

    todoList.className = "contentTodoList";
    taskBtn.className = "contentTaskBtn";
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
};

const Content = () => {
  const contentRoot = document.getElementById("root");
  const contentSec = document.createElement("section");
  const contentTitleBox = document.createElement("div");
  const contentTodoBox = document.createElement("div");
  const contentComBox = document.createElement("div");
  const contentSettingBox = document.createElement("div");
  const contentTodo = document.createElement("ul");
  const contentComplete = document.createElement("ul");
  const contentCompleteTitle = document.createElement("h3");
  const contentTodoInput = document.createElement("input");
  const contentTaskTitle = document.createElement("h3");
  const contentTitle = document.createElement("h2");
  const contentHomeLink = document.createElement("a");
  const contentSettingBtn = document.createElement("button");
  const contentEditBtn = document.createElement("button");
  const contentDeleteBtn = document.createElement("button");
  const contentTodoForm = document.createElement("form");
  const contentTodoBtn = document.createElement("button");
  const contentTask = document.querySelectorAll(".contentTodoList");

  contentTitle.textContent = "학교";
  contentHomeLink.textContent = "﹤";
  contentSettingBtn.textContent = "···";
  contentEditBtn.textContent = "Edit Collection";
  contentDeleteBtn.textContent = "Delete Collection";
  contentTodoInput.placeholder = "Add task";
  contentTodoInput.type = "text";
  contentTodoBtn.textContent = "+";
  contentTaskTitle.textContent = `Tasks - ${contentTask.length}`;

  contentTaskTitle.className = "contentTaskTitle";
  contentComplete.className = "contentComplete";
  contentCompleteTitle.className = "contentCompleteTitle";
  contentTodo.className = "contentTodo";
  contentTitleBox.className = "contentTitleBox";
  contentSettingBox.className = "settingBox";
  contentSec.className = "contentSection";
  contentTodoBox.className = "contentTodoBox";
  contentComBox.className = "contentComBox";
  contentSettingBtn.className = "contentSettingBtn";
  contentEditBtn.className = "settingEdit";
  contentDeleteBtn.className = "settingDelete";

  contentTodoForm.append(contentTodoBtn, contentTodoInput);
  contentComBox.append(contentComplete, contentCompleteTitle);
  contentTodoBox.append(contentTaskTitle, contentTodo, contentTodoForm);
  contentSettingBox.append(contentEditBtn, contentDeleteBtn);
  contentTitleBox.append(
    contentHomeLink,
    contentTitle,
    contentSettingBtn,
    contentSettingBox
  );
  contentSec.append(contentTitleBox, contentTodoBox, contentComBox);
  contentRoot.append(contentSec);

  contentSettingBtn.addEventListener(
    "click",
    ContentController.clickContentSettingBtn
  );
  contentSettingBtn.addEventListener("blur", ContentController.blurSettignBox);
  contentEditBtn.addEventListener("click", ContentController.clickContentPopup);
  contentTodoForm.addEventListener("submit", ContentController.addTodo);

  const contentCss = document.createElement("link");
  contentCss.rel = "stylesheet";
  contentCss.href = "/content/content.css";
  document.head.appendChild(contentCss);
};

export default Content;
