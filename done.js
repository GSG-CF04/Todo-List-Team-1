// Done Logic

[...document.querySelectorAll(".task")].forEach(t => {
  t.addEventListener("click", (e) => {
      e.currentTarget.classList.toggle("done");
      doneLocalStorage(e);
  })
});

function doneLocalStorage(e) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let curEle = tasks.findIndex((t) => {
    t.id == e.currentTarget.dataset.id
  });
  if (tasks[curEle].done) {
    tasks[curEle].done = false;
  }
  else {
    tasks[curEle].done = true;
  }
  
}