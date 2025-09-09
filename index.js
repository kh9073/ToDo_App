// DOM Elements
const taskname = document.querySelector("#taskname");
const addBtn = document.querySelector("#addBtn");
const taskContainer = document.querySelector("#taskContainer");

const filterContainer = document.createElement("div");
filterContainer.className = "filter-container";

const allBtn = document.createElement("button");
allBtn.innerText = "All";
allBtn.className = "active"; 

const pendingBtn = document.createElement("button");
pendingBtn.innerText = "Pending";

const completedBtn = document.createElement("button");
completedBtn.innerText = "Completed";

const clearCompletedBtn = document.createElement("button");
clearCompletedBtn.id = "clearCompletedBtn";
clearCompletedBtn.innerText = "Clear Completed";

filterContainer.appendChild(allBtn);
filterContainer.appendChild(pendingBtn);
filterContainer.appendChild(completedBtn);
filterContainer.appendChild(clearCompletedBtn);
taskContainer.parentNode.insertBefore(filterContainer, taskContainer);

let tasks = [];
let taskid = 1;
let currentFilter = "All";

init();

function init() {
  getTasks();

  setupEventListeners();

  renderTasks(currentFilter);

  taskname.focus();
}

function setupEventListeners() {
  taskname.addEventListener("keyup", handleEnterKey);
  addBtn.addEventListener("click", addTask);

  allBtn.addEventListener("click", () => {
    setActiveFilter(allBtn);
    currentFilter = "All";
    renderTasks(currentFilter);
  });

  pendingBtn.addEventListener("click", () => {
    setActiveFilter(pendingBtn);
    currentFilter = "Pending";
    renderTasks(currentFilter);
  });

  completedBtn.addEventListener("click", () => {
    setActiveFilter(completedBtn);
    currentFilter = "Completed";
    renderTasks(currentFilter);
  });

  clearCompletedBtn.addEventListener("click", ()=>{
    tasks = tasks.filter((task) => task.status !== "Completed");

    storeTasks();
    renderTasks(currentFilter);
    updateTaskCounter();
  });
}

function setActiveFilter(activeButton) {
  allBtn.classList.remove("active");
  pendingBtn.classList.remove("active");
  completedBtn.classList.remove("active");

  activeButton.classList.add("active");
}

function handleEnterKey(e) {
  if (e.key === "Enter") {
    addTask();
  }
}

function addTask() {
  const title = taskname.value.trim();

  if (!title) {
    alert("Please enter a task!");
    return;
  }

  const taskObj = {
    id: taskid++,
    title: title,
    status: "Pending",
  };

  tasks.push(taskObj);

  storeTasks();

  if (currentFilter === "All" || currentFilter === "Pending") {
    addDom(taskObj);
  }

  updateTaskCounter();

  taskname.value = "";
  taskname.focus();
}

function addDom(task) {
  const taskDiv = document.createElement("div");
  taskDiv.setAttribute("id", task.id);

  const spanTitle = document.createElement("span");
  spanTitle.innerText = task.title;
  taskDiv.appendChild(spanTitle);

  const chkbox = document.createElement("input");
  chkbox.setAttribute("type", "checkbox");

  if (task.status === "Completed") {
    chkbox.checked = true;
    spanTitle.style.textDecoration = "line-through";
    spanTitle.style.opacity = "0.7";
  }

  taskDiv.appendChild(chkbox);

  chkbox.addEventListener("click", function () {
    toggleTaskStatus(task, chkbox, spanTitle);
  });

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  taskDiv.appendChild(delBtn);

  delBtn.addEventListener("click", function (e) {
    deleteTask(e, task.id);
  });

  taskContainer.appendChild(taskDiv);
}

function toggleTaskStatus(task, checkbox, titleSpan) {
  const newStatus = checkbox.checked ? "Completed" : "Pending";

  
  task.status = newStatus;

  
  if (newStatus === "Completed") {
    titleSpan.style.textDecoration = "line-through";
    titleSpan.style.opacity = "0.7";
  } else {
    titleSpan.style.textDecoration = "none";
    titleSpan.style.opacity = "1";
  }

  storeTasks();

  if (currentFilter !== "All") {
    renderTasks(currentFilter);
  }
}

function deleteTask(e, taskId) {

  e.target.parentNode.remove();
  tasks = tasks.filter((task) => task.id != taskId);

  storeTasks();
  updateTaskCounter();
  checkEmptyState();
}


function renderTasks(filter = "All") {
  taskContainer.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "Pending") {
    filteredTasks = tasks.filter((task) => task.status === "Pending");
  } else if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.status === "Completed");
  }


  if (filteredTasks.length > 0) {
    filteredTasks.forEach(addDom);
  } else {
    showEmptyMessage(filter);
  }
  updateTaskCounter();
}

function showEmptyMessage(filter) {
  const emptyMsg = document.createElement("p");
  emptyMsg.className = "empty-message";

  switch (filter) {
    case "All":
      emptyMsg.textContent = "No tasks yet. Add a task to get started!";
      break;
    case "Pending":
      emptyMsg.textContent = "No pending tasks. Great job!";
      break;
    case "Completed":
      emptyMsg.textContent = "No completed tasks yet.";
      break;
  }

  taskContainer.appendChild(emptyMsg);
}

function checkEmptyState() {
  if (tasks.length === 0) {
    showEmptyMessage(currentFilter);
  }
}

function updateTaskCounter() {
  const pendingCount = tasks.filter((task) => task.status === "Pending").length;
  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  document.title = `Todo App (${pendingCount} pending)`;

  pendingBtn.innerText = `Pending (${pendingCount})`;
  completedBtn.innerText = `Completed (${completedCount})`;
}

function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks.length > 0) {
      const highestId = Math.max(...tasks.map((task) => task.id));
      taskid = highestId + 1;
    }
  }
}
