import { MyReact } from "../core/react.js";

const CollectionTask = (task) => {
  const [check, setCheck] = MyReact.useState(false);
  const clickTaskBtn = async (e) => {
    const content = e.target.nextElementSibling.textContent;
    const taskId = e.target.parentNode.dataset.id;
    const url = new URL(window.location);
    const collectionId = url.pathname.split("/collection/")[1];

    const postDoneData = await axios.post(`/collection/done/${collectionId}`, {
      content,
      doneId: taskId,
    });
    if (postDoneData.data) {
      const deleteTaskData = await axios.post(
        `/collection/tasks/delete/${collectionId}`,
        { taskId }
      );
      setCheck(!check);
    } else {
      alert("API권한이 없습니다.");
    }
  };
  window.handleClickTaskBtn = clickTaskBtn;

  return `
  <li class="collectionTodoList" data-id="${task.taskId}">
    <button class="collectionTaskBtn" onclick="handleClickTaskBtn(event)"> </button>
    <p>${task.content}</p>
  </li>
  `;
};
export default CollectionTask;
