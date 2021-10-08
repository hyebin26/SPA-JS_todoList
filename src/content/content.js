const clickContentSettingBtn = () => {
  const clickSettingBox = document.querySelector(".settingBox");
  clickSettingBox.classList.toggle("activeS");
};
const blurSettignBox = () => {
  const blurSettingBox = document.querySelector(".settingBox");
  setTimeout(() => {
    blurSettingBox.classList.remove("activeS");
  }, 100);
};
const clickContentPopup = () => {
  const clickContentPopup = document.querySelector(".popupContainer");
  clickContentPopup.classList.add("activeP");
};

const sutmitTodoForm = (e) => {
  e.preventDefault();
  const submitTodo = document.querySelector(".contentTodo");
  const submitTaskCnt = document.querySelectorAll(".contentTodoList");
  const submitTaskTitle = document.querySelector(".contentTaskTitle");
  const todoList = document.createElement("li");
  const taskBtn = document.createElement("button");
  const taskText = document.createElement("p");

  todoList.className = "contentTodoList";
  taskBtn.className = "contentTaskBtn";

  submitTaskTitle.textContent = `Tasks - ${submitTaskCnt.length + 1}`;
  taskText.textContent = e.target[1].value;
  taskBtn.textContent = "  ";
  todoList.append(taskBtn, taskText);
  submitTodo.append(todoList);
  e.target[1].value = "";
};

const Content = () => {
  const contentRoot = document.getElementById("root");
  const contentSec = document.createElement("section");
  const contentTitleBox = document.createElement("div");
  const contentTodoBox = document.createElement("div");
  const contentComBox = document.createElement("div");
  const contentSettingBox = document.createElement("div");
  const contentTodo = document.createElement("ul");
  const contentTodoInput = document.createElement("input");
  const contentCom = document.createElement("ul");
  const contentTaskTitle = document.createElement("h3");
  const contentComP = document.createElement("p");
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

  contentSettingBtn.addEventListener("click", clickContentSettingBtn);
  contentSettingBtn.addEventListener("blur", blurSettignBox);
  contentEditBtn.addEventListener("click", clickContentPopup);
  contentTodoForm.addEventListener("submit", sutmitTodoForm);

  const contentCss = document.createElement("link");
  contentCss.rel = "stylesheet";
  contentCss.href = "/content/content.css";
  document.head.appendChild(contentCss);
};

export default Content;
