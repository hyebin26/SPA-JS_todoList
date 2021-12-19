import { Link } from "../link.js";

const MainCollection = (item) => {
  return `
    <li class="mainTodoList">
     ${Link({
       to: `/collection/${item.collectionId} `,
       content: `
        <div class="mainTodoColor" style="background:${item.color};">
          <img src="/image/arrow.jpg" alt="arrow">
        </div>
        <div class="mainTodoText">
          <h3 class="mainTodoTItle">${item.collection}</h3>
          <p class="mainTodoTask">${item.tasks.split(",").length} task</p>
        </div>`,
     })}
    </li>
    `;
};
export default MainCollection;
