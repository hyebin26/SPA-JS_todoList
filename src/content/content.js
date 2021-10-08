const clickContentSettingBtn = () => {
  // 미리 만들어놓은 박스 가겨와서 키기
};

const Content = () => {
  const contentRoot = document.getElementById("root");
  const contentSec = document.createElement("section");
  const contentTitleBox = document.createElement("div");
  const contentTodoBox = document.createElement("div");
  const contentComBox = document.createElement("div");
  const contentSettingBox = document.createElement("div");
  const contentTodo = document.createElement("ul");
  const contentCom = document.createElement("ul");
  const contentTodoP = document.createElement("p");
  const contentComP = document.createElement("p");
  const contentTitle = document.createElement("h2");
  const contentHomeLink = document.createElement("a");
  const contentSettingBtn = document.createElement("button");
  const contentEditBtn = document.createElement("button");
  const contentDeleteBtn = document.createElement("button");

  contentTitle.textContent = "학교";
  contentHomeLink.textContent = "﹤";
  contentSettingBtn.textContent = "···";
  contentEditBtn.textContent = "Edit Collection";
  contentDeleteBtn.textContent = "Delete Collection";

  contentTitleBox.className = "contentTitleBox";
  contentSettingBox.className = "settingBox";
  contentSec.className = "contentSection";
  contentTodoBox.className = "contentTodoBox";
  contentComBox.className = "contentComBox";
  contentSettingBtn.className = "contentSettingBtn";
  contentEditBtn.className = "settingEdit";
  contentDeleteBtn.className = "settingDelete";

  contentSettingBox.append(contentEditBtn, contentDeleteBtn);
  contentTitleBox.append(
    contentHomeLink,
    contentTitle,
    contentSettingBtn,
    contentSettingBox
  );
  contentSec.append(contentTitleBox, contentTodoBox, contentComBox);
  contentRoot.append(contentSec);

  const contentCss = document.createElement("link");
  contentCss.rel = "stylesheet";
  contentCss.href = "/content/content.css";
  document.head.appendChild(contentCss);
};

export default Content;
