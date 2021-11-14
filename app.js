// Dark Mode Toggle
let toggleBtn = document.querySelector(".toggle-btn");
let body = document.body;

function setDarkTheme() {
  body.toggleAttribute("data-dark");
}

function updateTheme() {
  localStorage.dark === "off" || !localStorage.dark
    ? (localStorage.dark = "on")
    : (localStorage.dark = "off");
}

toggleBtn.onclick = () => {
  setDarkTheme();
  updateTheme();
};

// Render Stored Tasks In localStorage onload
if (localStorage.tasks !== "[]" && localStorage.tasks) {
  let tasksWrapper = document.querySelector("#tasks-wrapper");
  let allTasks = JSON.parse(localStorage.tasks);
  allTasks.forEach((t) => {
    let task = document.createElement("div");
    task.className = "task";
    task.setAttribute("data-id", t.id);
    let content = document.createElement("span");
    content.className = t.done ? "content done" : "content";
    content.textContent = t.val;
    let btnsWrapper = document.createElement("div");
    btnsWrapper.className = "button-parent";
    let done = document.createElement("div");
    done.className = t.done ? "checkmark done" : "checkmark";
    done.setAttribute("onclick", "done(this)");
    let del = document.createElement("button");
    del.id = "delete";
    let delIco = document.createElement("i");
    delIco.className = "far fa-trash-alt";
    let edit = document.createElement("button");
    edit.id = "edit";
    let editIco = document.createElement("i");
    editIco.className = "far fa-edit";
    del.append(delIco);
    edit.append(editIco);
    btnsWrapper.append(done, del, edit);
    task.append(content, btnsWrapper);
    tasksWrapper.prepend(task);
  });
}

// Set Theme If It Was Selected Previously
if (localStorage.dark === "on") body.toggleAttribute("data-dark");

// Add A Task
let inputFiled = document.getElementById("input-task");
let addBtn = document.getElementById("add-task");
let arrayItem = [];
let specialId;
function addTask() {
  if (inputFiled.value.trim() !== "") {
    specialId = new Date().getTime();
    let curTask = {
      val: inputFiled.value,
      id: `${specialId}`,
      done: false,
    };
    arrayItem.push(curTask);
    localStorage.setItem("tasks", JSON.stringify(arrayItem));
  }
}

function displayTask() {
  if (inputFiled.value.trim() !== "") {
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

addBtn.addEventListener("click", addTask);
addBtn.addEventListener("click", displayTask);
inputFiled.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
    displayTask();
  }
});

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
  content.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      let allTasks = JSON.parse(localStorage.tasks);
      let taskIdx = allTasks.findIndex((t) => {
        return e.target.matches("#edit")
          ? t.id == e.target.parentElement.parentElement.dataset.id
          : t.id ==
              e.target.parentElement.parentElement.parentElement.dataset.id;
      });
      if (ev.currentTarget.hasAttribute("contenteditable")) {
        ev.currentTarget.removeAttribute("contenteditable");
        allTasks[taskIdx].val = content.textContent;
        localStorage.tasks = JSON.stringify(allTasks);
      }
    }
  });
}

// Do a task when an event is made on the document.
document.addEventListener("click", (e) => {
  delTask(e);
  editTask(e);
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
