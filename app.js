// Delete task
function delTask(e) {
  if (!e.target.matches(".far.fa-trash-alt") && !e.target.matches("#delete"))
    return;
  // Remove element from lacalStorage
  let allTasks = JSON.parse(localStorage.tasks);
  let taskIdx = allTasks.findIndex((t) => {
    return e.target.matches("#delete")
      ? t.id == e.target.parentElement.parentElement.dataset.id
      : t.id == e.target.parentElement.parentElement.parentElement.dataset.id;
  });
  allTasks.splice(taskIdx, 1);
  localStorage.tasks = JSON.stringify(allTasks);
  // Remove task from page
  e.target.matches("#delete")
    ? e.target.parentElement.parentElement.remove()
    : e.target.parentElement.parentElement.parentElement.remove();
}

// Edit Task.
function editTask(e) {
  if (!e.target.matches(".far.fa-edit") && !e.target.matches("#edit")) return;
  // Edit content of task in the page
  let content = [...document.querySelectorAll(".content")].filter((t) => {
    return e.target.matches("#edit")
      ? t.parentElement.dataset.id ===
          e.target.parentElement.parentElement.dataset.id
      : t.parentElement.dataset.id ===
          e.target.parentElement.parentElement.parentElement.dataset.id;
  })[0];

  content.setAttribute("contenteditable", "true");
  content.focus();
  // Edit content of current element in localStorage.
  let allTasks = JSON.parse(localStorage.tasks);
  let taskIdx = allTasks.findIndex((t) => {
    return e.target.matches("#edit")
      ? t.id == e.target.parentElement.parentElement.dataset.id
      : t.id == e.target.parentElement.parentElement.parentElement.dataset.id;
  });
  allTasks[taskIdx].val = content.textContent;
  localStorage.tasks = JSON.stringify(allTasks);
  content.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      if (e.currentTarget.hasAttribute("contenteditable")) {
        e.currentTarget.removeAttribute("contenteditable");
      }
    }
  });
}
//getting required elements
let inputFiled = document.getElementById("input-task");
let addBtn = document.getElementById("add-task");
let arrayItem = [];
let specialId;
function addTask() {
  specialId = new Date().getTime();
  let curTask = {
    val: inputFiled.value,
    id: `${specialId}`,
    done: false,
  };
  arrayItem.push(curTask);
  localStorage.setItem("tasks", JSON.stringify(arrayItem));
}

function displayTask() {
  if (inputFiled.value.trim() != "") {
    let warpperTask = document.getElementById("tasks-wrapper");
    let divTask = document.createElement("div");
    divTask.setAttribute("class", "task");
    divTask.setAttribute("data-id", specialId);
    let content = document.createElement("span");
    content.setAttribute("class", "content");
    content.textContent = inputFiled.value;
    divTask.appendChild(content);
    let editDelete = document.createElement("div");
    let checkmark = document.createElement("div");
    checkmark.setAttribute("onclick", "done(this)");
    checkmark.className = "checkmark";
    editDelete.append(checkmark);
    editDelete.setAttribute("class", "button-parent");
    let btnDelete = document.createElement("button");
    let delIcon = document.createElement("i");
    delIcon.className = "far fa-trash-alt";
    btnDelete.append(delIcon);
    btnDelete.setAttribute("id", "delete");
    editDelete.appendChild(btnDelete);
    let btnEdit = document.createElement("button");
    let editIcon = document.createElement("i");
    editIcon.className = "far fa-edit";
    btnEdit.append(editIcon);
    btnEdit.setAttribute("id", "edit");
    editDelete.appendChild(btnEdit);
    divTask.appendChild(editDelete);
    warpperTask.prepend(divTask);
    inputFiled.value = "";
  }
}

// Do a task when an event is made on the document.
document.addEventListener("click", (e) => {
  delTask(e);
  editTask(e);
});

// Dark Mode Toggle
let toggleBtn = document.querySelector(".toggle-btn");
let bodyElement = document.querySelector("body");

function setDarkTheme() {
  bodyElement.classList.toggle("dark");
}

toggleBtn.addEventListener("click", switchTheme);

function switchTheme() {
  let darkMode = localStorage.getItem("dark");

  if (darkMode !== "on") {
    setDarkTheme();
    darkMode = localStorage.setItem("dark", "on");
  } else {
    setDarkTheme();
    darkMode = localStorage.setItem("dark", "off");
  }
}
addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", displayTask);
inputFiled.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
    displayTask();
  }
});

// Done task
function done(obj) {
  obj.classList.toggle("done");
  let v = obj.parentElement.parentElement;
  v.children[0].classList.toggle("done");
  let allTasks = JSON.parse(localStorage.tasks);
  let cur = allTasks.findIndex((t) => {
    return t.id == v.dataset.id;
  });
  if (allTasks[cur].done) {
    allTasks[cur].done = false;
  } else {
    allTasks[cur].done = true;
  }
  localStorage.tasks = JSON.stringify(allTasks);
}
