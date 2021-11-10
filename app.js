
let inputFiled=document.getElementById("input-task");
let  addBtn=document.getElementById('add-task')
let arrayItem=[];
let specialId = new Date().getTime();
function addTask(){
let tasks={
    val: inputFiled.value,
    id: `${specialId}`, 
    done:false
}
arrayItem.push(tasks)
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function displayTask(){
let warpperTask=document.getElementById('tasks-wrapper')
let divTask=document.createElement("div")
divTask.setAttribute('class','task')
divTask.setAttribute("data-id", specialId);
let content=document.createElement("span")
content.setAttribute('class','content')
divTask.appendChild(content)
let editDelete=createElement('div')
editDelete.setAttribute('class','button-parent')
let btnDelete=document.createElement('button')
btnDelete.setAttribute('id','delete')
editDelete.appendChild(btnDelete)
let btnEdit=document.createElement('button')
btnEdit.setAttribute('id','edit')
editDelete.appendChild(btnEdit)
divTask.appendChild(editDelete)
warpperTask.prependChild(divTask)
}
addBtn.addEventListener('click', addTask)
addBtn.addEventListener('click', displayTask)
inputFiled.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
     addTask()
     displayTask()
    }
});


// Delete Task.
function delTask(e) {
  if (!e.target.matches("#delete")) return;
  // Remove element from lacalStorage
  let allTasks = JSON.parse(localStorage.tasks);
  let taskIdx = allTasks.findIndex(
    (t) => t.id == e.target.parentElement.parentElement.dataset.id
  );
  allTasks.splice(taskIdx, 1);
  localStorage.tasks = JSON.stringify(allTasks);
  // Remove task from page
  e.target.parentElement.remove();
}

// Edit Task.
let n = 2;
function editTask(e) {
  if (!e.target.matches("#edit")) return;
  // Edit content of task in the page
  let content = [...document.querySelectorAll(".content")].filter((t) => {
    return (
      t.parentElement.dataset.id ===
      e.target.parentElement.parentElement.dataset.id
    );
  })[0];
  if (n % 2 === 0) {
    content.setAttribute("contenteditable", "true");
    content.focus();
  } else {
    content.removeAttribute("contenteditable");
    // Edit content of current element in localStorage.
    let allTasks = JSON.parse(localStorage.tasks);
    let taskIdx = allTasks.findIndex(
      (t) => t.id == e.target.parentElement.parentElement.dataset.id
    );
    allTasks[taskIdx].val = content.textContent;
    localStorage.tasks = JSON.stringify(allTasks);
  }
  n++;
}

// Do a task when an event is made on the document.
document.addEventListener("click", (e) => {
  delTask(e);
  editTask(e);
});
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

let darkMode = localStorage.getItem("dark");

if (darkMode === "on") {
  setDarkTheme();
}
