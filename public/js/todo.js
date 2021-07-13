todoItemList = [];

const allTab = document.getElementById("all"),
  completedTab = document.getElementById("completed"),
  pendingTab = document.getElementById("pending");

allTab.addEventListener("click", (event) => {
  completedTab.classList.remove("active");
  pendingTab.classList.remove("active");
  allTab.classList.add("active");

  reRenderAllItems();
});

function reRenderAllItems() {
  const todoDomList = document.getElementById("todo-list");
  todoDomList.innerHTML = "";

  todoItemList.forEach((todoItemMap, index) => {
    todoItemMap.id = index;

    const listElement = document.createElement("li");
    listElement.id = todoItemMap.id;

    listElement.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (todoItemMap.completed) {
      listElement.classList.add("completed");
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", (event) => {
      todoItemMap.completed = event.target.checked;
      if (event.target.checked) {
        listElement.classList.add("completed");
      } else {
        listElement.classList.remove("completed");
      }
    });

    const closeButton = document.createElement("input");
    closeButton.type = "button";
    closeButton.value = "x";
    closeButton.classList.add("close-todo");
    closeButton.id = todoItemMap.id;

    closeButton.addEventListener("click", (event) => {
      todoItemList = todoItemList.filter(
        (todoItem) => todoItem.id != event.target.id
      );
      reRenderAllItems();
    });

    listElement.appendChild(checkbox);
    listElement.append(todoItemMap.value);
    listElement.appendChild(closeButton);

    todoDomList.appendChild(listElement);
  });
}

completedTab.addEventListener("click", (event) => {
  allTab.classList.remove("active");
  pendingTab.classList.remove("active");
  completedTab.classList.add("active");

  reRenderCompletedItems();
});

function reRenderCompletedItems() {
  const todoDomList = document.getElementById("todo-list");
  todoDomList.innerHTML = "";

  todoItemList.forEach((todoItemMap, index) => {
    if (!todoItemMap.completed) return;

    todoItemMap.id = index;

    const listElement = document.createElement("li");
    listElement.id = todoItemMap.id;

    listElement.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (todoItemMap.completed) {
      listElement.classList.add("completed");
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", (event) => {
      todoItemMap.completed = event.target.checked;
      if (event.target.checked) {
        listElement.classList.add("completed");
      } else {
        listElement.classList.remove("completed");
      }
    });

    const closeButton = document.createElement("input");
    closeButton.type = "button";
    closeButton.value = "x";
    closeButton.classList.add("close-todo");
    closeButton.id = todoItemMap.id;

    closeButton.addEventListener("click", (event) => {
      todoItemList = todoItemList.filter(
        (todoItem) => todoItem.id != event.target.id
      );
      reRenderCompletedItems();
    });

    listElement.appendChild(checkbox);
    listElement.append(todoItemMap.value);
    listElement.appendChild(closeButton);

    todoDomList.appendChild(listElement);
  });
}

pendingTab.addEventListener("click", (event) => {
  completedTab.classList.remove("active");
  allTab.classList.remove("active");
  pendingTab.classList.add("active");

  reRenderPendingItems();
});

function reRenderPendingItems() {
  const todoDomList = document.getElementById("todo-list");
  todoDomList.innerHTML = "";

  todoItemList.forEach((todoItemMap, index) => {
    if (todoItemMap.completed) return;

    todoItemMap.id = index;

    const listElement = document.createElement("li");
    listElement.id = todoItemMap.id;

    listElement.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (todoItemMap.completed) {
      listElement.classList.add("completed");
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", (event) => {
      todoItemMap.completed = event.target.checked;
      if (event.target.checked) {
        listElement.classList.add("completed");
      } else {
        listElement.classList.remove("completed");
      }
    });

    const closeButton = document.createElement("input");
    closeButton.type = "button";
    closeButton.value = "x";
    closeButton.classList.add("close-todo");
    closeButton.id = todoItemMap.id;

    closeButton.addEventListener("click", (event) => {
      todoItemList = todoItemList.filter(
        (todoItem) => todoItem.id != event.target.id
      );
      reRenderPendingItems();
    });

    listElement.appendChild(checkbox);
    listElement.append(todoItemMap.value);
    listElement.appendChild(closeButton);

    todoDomList.appendChild(listElement);
  });
}

function addTodoItem(event) {
  event.preventDefault();
  const todoItem = document.getElementById("todo-input").value;

  const todoItemMap = {
    value: todoItem,
    completed: false,
    id: todoItemList.length,
  };

  todoItemList.push(todoItemMap);

  reRenderAllItems();
}
