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
