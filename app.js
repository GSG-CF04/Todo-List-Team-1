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


