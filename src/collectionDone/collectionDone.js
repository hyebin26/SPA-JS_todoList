import { MyReact } from "../core/react.js";

const CollectionDone = (done) => {
  const [check, setCheck] = MyReact.useState(false);
  const clickdoneBtn = async (e) => {
    const content = e.target.nextElementSibling.textContent;
    const doneId = e.target.parentNode.dataset.id;
    const url = new URL(window.location);
    const collectionId = url.pathname.split("/collection/")[1];
    try {
      const postTaskData = await axios.post(
        `/collection/tasks/${collectionId}`,
        {
          content,
          doneId,
        }
      );
      if (postTaskData.data) {
        const deleteDoneData = await axios.post(
          `/collection/done/delete/${collectionId}`,
          { doneId }
        );
        if (deleteDoneData.data) {
          setCheck(!check);
        }
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("API권한이 없습니다.");
        return;
      }
      console.log(err);
      alert("다시 시도해주세요.");
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
