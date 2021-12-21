import Header from "../header/header.js";
import Popup from "../popup/popup.js";
import { MyReact } from "../core/react.js";
import CollectionTask from "../collectionTask/collectionTask.js";

const ContentModel = {
  task: {},
  complete: {},
};

const ContentController = {
  clickContentSettingBtn: () => {
    const clickSettingBox = document.querySelector(".settingBox");
    clickSettingBox.classList.toggle("activeS");
  },
  addTodo: (e) => {},
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

    addedCollectionLi.dataset.id = collectionId;
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
  const [task, setTask] = MyReact.useState(null);
  const [done, setDone] = MyReact.useState(null);
  const [title, setTitle] = MyReact.useState(null);
  const [loading, setLoading] = MyReact.useState(true);

  const url = new URL(window.location);
  const searchPathname = url.pathname.split("/");
  const collectionId = searchPathname[2];

  const addCollectionTask = (e) => {
    // submit일 경우임
    // done에서 넘어올 수 도 있음
    e.preventDefault();
    const taskValue =
      task === "" ? e.target[1].value : `${task},${e.target[1].value}`;
    axios.patch(`/collection/collectionId/${collectionId}`, {
      taskValue,
    });
    setTask(taskValue);
  };

  window.handleTaskBtn = ContentController.clickTaskBtn;
  window.handleContentSettingBtn = ContentController.clickContentSettingBtn;
  window.handleCollectionAdd = addCollectionTask;
  window.handleEditCollectionBtn = ContentController.clickContentEditBtn;

  const loadCollectionIdData = async () => {
    const axiosCollectionIdData = await axios.get(
      `/collection/collectionId/${collectionId}`
    );
    const collectionIdData = axiosCollectionIdData.data;
    setLoading(false);
    const splitTask = collectionIdData[0].tasks.split(",");
    const splitDone = collectionIdData[0].done.split(",");
    setTask(splitTask);
    setDone(splitDone);
    setTitle(collectionIdData[0].collection);
  };
  document.addEventListener("DOMContentLoaded", loadCollectionIdData());
  if (!loading) {
    return `
  ${Header()}
  ${Popup()}
  <section class="collectionSection">
    <div class="collectionTitleBox">
      <a>﹤</a>
      <h2>${title}</h2>
      <button class="collectionSettingBtn" onclick="handleContentSettingBtn()">···</button>
      <div class="settingBox">
        <button class="settingEdit" onclick="handleEditCollectionBtn()">Edit Collection</button>
        <button class="settingDelete">Delete Collection</button>
      </div>
    </div>
    <div class="collectionTodoBox">
      <h3 class="collectionTaskTitle" >Tasks - ${
        task[0] === "" ? 0 : task.length
      }</h3>
      <ul class="collectionTodo"></ul>
      ${
        task[0] === ""
          ? ""
          : task.map((item, idx) => CollectionTask(item, idx)).join("")
      }
      <li>
        <form onsubmit="handleCollectionAdd(event)">
          <button>+</button>
          <input placeholder="Add task" type="text" /> 
        </form>
      </li>
    </div>
    <div class="collectionComBox">
      <h3 class="collectionCompleteTitle"></h3>
      <ul class="collectionComplete"></ul>
    </div>
  </section>
  `;
  }
};

export default Collection;
