import { MyReact } from "../core/react.js";

const CollectionDone = (done) => {
  const [check, setCheck] = MyReact.useState(false);
  const clickdoneBtn = async (e) => {
    // done 삭제, task에 추가
    const content = e.target.nextElementSibling.textContent;
    const doneId = e.target.parentNode.dataset.id;
    const url = new URL(window.location);
    const collectionId = url.pathname.split("/collection/")[1];
    const postTaskData = await axios.post(`/collection/tasks/${collectionId}`, {
      content,
      doneId,
    });
    if (postTaskData.data) {
      const deleteDoneData = await axios.post(
        `/collection/done/delete/${collectionId}`,
        { doneId }
      );
      setCheck(!check);
    } else {
      alert("API권한이 없습니다.");
    }
  };
  window.handleDoneBtn = clickdoneBtn;
  return `
  <li class="collectionDoneList" data-id="${done.doneId}">
    <button class="collectionDoneBtn" onclick="handleDoneBtn(event)">✓</button>
    <p>${done.content}</p>
  </li>
  `;
};
export default CollectionDone;
