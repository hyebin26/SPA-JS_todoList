const List = () => {
  const listRoot = document.getElementById("root");
  const listDiv = document.createElement("div");
  const title = document.createElement("h1");
  const p = document.createElement("p");
  const addBtn = document.createElement("button");
  const minusBtn = document.createElement("button");
  const link = document.createElement("a");
  link.href = "";
  link.textContent = "저쪾으로?";

  link.addEventListener("click", () => {
    history.pushState({}, "", "test");
  });
  addBtn.id = "add";
  minusBtn.id = "minus";
  p.id = "p";

  addBtn.textContent = "+";
  minusBtn.textContent = "-";
  title.textContent = "SPA도전하기";
  p.textContent = 0;

  listDiv.append(title);
  listDiv.append(title, p, addBtn, minusBtn, link);

  listRoot.append(listDiv);
};

const ListEvent = () => {
  const addBtn = document.getElementById("add");
  const minusBtn = document.getElementById("minus");
  const p = document.getElementById("p");
  let count = p.textContent;

  const clickAddBtn = () => {
    count++;
    console.log(count);
    p.textContent = count;
  };

  const clickMinusBtn = () => {
    count--;
    p.textContent = count;
  };

  addBtn.addEventListener("click", clickAddBtn);
  minusBtn.addEventListener("click", clickMinusBtn);
};

const init = () => {
  List();
  ListEvent();
};
init();
