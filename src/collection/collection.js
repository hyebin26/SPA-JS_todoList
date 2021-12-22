import Header from "../header/header.js";
import Popup from "../popup/popup.js";
import { MyReact } from "../core/react.js";
import CollectionTask from "../collectionTask/collectionTask.js";
import CollectionDone from "../collectionDone/collectionDone.js";

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
};

const Collection = (props) => {
  // contentSettingBtn.addEventListener(
  //   "click",
  //   ContentController.clickContentSettingBtn
  // );
  // contentSettingBtn.addEventListener("blur", ContentController.blurSettignBox);
  // contentEditBtn.addEventListener("click", ContentController.clickContentPopup);
  // contentTodoForm.addEventListener("submit", ContentController.addTodo);
  const [task, setTask] = MyReact.useState([]);
  const [done, setDone] = MyReact.useState([]);
  const [title, setTitle] = MyReact.useState("");
  const [loading, setLoading] = MyReact.useState(true);

  const url = new URL(window.location);
  const searchPathname = url.pathname.split("/");
  const collectionId = searchPathname[2];

  const addCollectionTask = (e) => {
    // submit일 경우임
    // done에서 넘어올 수 도 있음
    e.preventDefault();
    const taskValue = e.target[1].value;
    axios.post(`/collection/collectionId/${collectionId}`, {
      taskValue,
    });
    // setTask(taskValue);
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
    // const splitDone = collectionIdData[0].done.split(",");
    setTask(collectionIdData.tasks);
    setDone(collectionIdData.done);
    setTitle(collectionIdData.title);
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
        !task.length ? 0 : task.length
      }</h3>
      <ul class="collectionTodo"></ul>
      ${
        !task.length
          ? ""
          : task.map((item, idx) => CollectionTask(item, idx, setDone)).join("")
      }
      <li>
        <form onsubmit="handleCollectionAdd(event)">
          <button>+</button>
          <input placeholder="Add task" type="text" /> 
        </form>
      </li>
    </div>
    <div class="collectionDoneBox">
      <h3 class="collectionDoneTitle">${
        !done.length ? "" : `Done - ${done.length}`
      }</h3>
      <ul class="collectionDoneUl">
      ${!done.length ? "" : done.map((item) => CollectionDone(item)).join("")}
      </ul>
    </div>
  </section>
  `;
  }
};

export default Collection;
