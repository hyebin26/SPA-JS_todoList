const MainCollection = (color, title, tasks) => {
  const mainCollectionCss = document.createElement("link");
  mainCollectionCss.rel = "stylesheet";
  mainCollectionCss.href = "/src/mainCollection/mainCollection.css";
  document.head.appendChild(mainCollectionCss);

  return `
    <li class="mainTodoList">
      <a>
        <div class="mainTodoColor">
           <img src="/image/arrow.jpg" alt="arrow" style="background:"${color}"">
        </div>
        <div class="mainTodoText">
            <h3 class="mainTodoTItle">${title}</h3>
            <p class="mainTodoTask">${tasks.length} task</p>
        </div>
      </a>
    </li>
    `;
};
export default MainCollection;
