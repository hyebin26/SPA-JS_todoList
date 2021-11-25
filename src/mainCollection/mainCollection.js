const MainCollection = (color, title, tasks) => {
  const mainCollectionCss = document.createElement("link");
  mainCollectionCss.rel = "stylesheet";
  mainCollectionCss.href = "/src/mainCollection/mainCollection.css";
  document.head.appendChild(mainCollectionCss);

  return `
    <li class="mainTodoList">
      <a>
        <div class="mainTodoColor">
        
        </div>
        <div class="mainTodoText">
         
        </div>
      </a>
    </li>
    `;
};
export default MainCollection;
