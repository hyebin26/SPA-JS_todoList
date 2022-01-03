import Header from "../header/header.js";
import Popup from "../popup/popup.js";
import { MyReact } from "../core/react.js";
import CollectionTask from "../collectionTask/collectionTask.js";
import CollectionDone from "../collectionDone/collectionDone.js";
import { Link } from "../link.js";

const Collection = () => {
  const [todo, setTodo] = MyReact.useState([]);
  const [done, setDone] = MyReact.useState([]);
  const [title, setTitle] = MyReact.useState("");
  const [loading, setLoading] = MyReact.useState(true);
  const [isShow, setIsShow] = MyReact.useState(false);
  const [check, setCheck] = MyReact.useState(false);

  const url = new URL(window.location);
  const searchPathname = url.pathname.split("/");
  const collectionId = searchPathname[2];

  const addCollectionTask = async (e) => {
    e.preventDefault();
    const taskValue = e.target[1].value;
    const postTaskData = await axios.post(`/collection/tasks/${collectionId}`, {
      content: taskValue,
    });
    if (postTaskData) {
      setCheck(!check);
    } else {
      alert("API권한이 없습니다.");
    }
  };
  const clickSettingBox = () => {
    const clickSettingBox = document.querySelector(".settingBox");
    clickSettingBox.classList.toggle("activeS");
  };
  const clickContentEditBtn = () => {
    setIsShow(true);
  };
  const loadCollectionIdData = async () => {
    const axiosCollectionIdData = await axios.get(
      `/collection/collectionId/${collectionId}`
    );
    const collectionIdData = axiosCollectionIdData.data;
    setTodo(collectionIdData.tasks);
    setDone(collectionIdData.done);
    setTitle(collectionIdData.title);
    setLoading(false);
  };
  const clickDeleteCollectionBtn = async () => {
    const dialog = confirm("정말 삭제하시겟습니까?");
    if (dialog) {
      const deleteCollectionData = await axios.delete(
        `/collection/${collectionId}`
      );
      if (deleteCollectionData.data) {
        history.pushState("", "", "/main");
        alert("삭제되었습니다.");
        setCheck(!check);
      }
      if (!deleteCollectionData.data) {
        alert("API권한이 없습니다.");
      }
    } else {
      return false;
    }
  };
  window.handleCollectionAdd = addCollectionTask;
  window.handleEditCollectionBtn = clickContentEditBtn;
  window.handleSettingBox = clickSettingBox;
  window.handleDeleteCollectionBtn = clickDeleteCollectionBtn;
  document.addEventListener("DOMContentLoaded", loadCollectionIdData());
  return `
  ${Header()}
  ${Popup(isShow, setIsShow)}
  <section class="collectionSection">
    ${
      !loading
        ? `<div class="collectionTitleBox">
    ${Link({ to: "/main", content: "<" })}
    <h2>${title}</h2>
    <button class="collectionSettingBtn" onclick="handleSettingBox()">···</button>
    <div class="settingBox">
      <button class="settingEdit" onclick="handleEditCollectionBtn()">Edit Collection</button>
      <button class="settingDelete" onclick="handleDeleteCollectionBtn()">Delete Collection</button>
    </div>
  </div>
  <div class="collectionTodoBox">
    <h3 class="collectionTaskTitle" >Tasks - ${
      !todo.length ? 0 : todo.length
    }</h3>
    <ul class="collectionTodo">
    ${
      !todo.length
        ? ""
        : todo.map((item) => CollectionTask(item, setDone)).join("")
    }
    <li>
        <form onsubmit="handleCollectionAdd(event)">
          <button>+</button>
          <input placeholder="Add task" type="text" /> 
        </form>
    </li>
    </ul>
  </div>
  <div class="collectionDoneBox">
    <h3 class="collectionDoneTitle">${
      !done.length ? "" : `Done - ${done.length}`
    }</h3>
    <ul class="collectionDoneUl">
    ${!done.length ? "" : done.map((item) => CollectionDone(item)).join("")}
    </ul>
  </div>
</section>`
        : ""
    }
  `;
};

export default Collection;
