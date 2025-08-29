let tasks = [];
let activeFilter = "all";

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) { alert("Please enter a task!"); return; }

  tasks.push({ text, status: "pending" });
  input.value = "";
  render();

  let li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleTask(this)">${taskText}</span>
    <button class="delete-btn" onclick="deleteTask(this)">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
  updateCounter();

}



function markCompleted(index) {
  tasks[index].status = "completed";
  render();
}

function markPending(index) {
  tasks[index].status = "pending";
  render();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
}

function clearAll() {
  tasks = [];
  render();
}

function setFilter(type) {
  activeFilter = type;

  // button active toggle
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  document.querySelector(`.filters button[data-filter="${type}"]`).classList.add("active");

  // section view toggle
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  if (type === "all") document.getElementById("allView").classList.add("active");
  if (type === "pending") document.getElementById("pendingView").classList.add("active");
  if (type === "completed") document.getElementById("completedView").classList.add("active");

  render();
}

function render() {
  // clear all lists
  document.getElementById("pendingList_all").innerHTML = "";
  document.getElementById("completedList_all").innerHTML = "";
  document.getElementById("pendingList_only").innerHTML = "";
  document.getElementById("completedList_only").innerHTML = "";

  // hide all headings first
  document.querySelectorAll(".section-title").forEach(h => h.style.display = "none");

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    if (task.status === "completed") li.classList.add("completed");

    const span = document.createElement("span");
    span.className = "task-title";
    span.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "actions";

    // ✅ complete
    const btnC = document.createElement("button");
    btnC.className = "icon-btn icon-complete";
    btnC.textContent = "✅";
    btnC.title = "Mark as Completed";
    btnC.onclick = () => markCompleted(i);

    // ↩ pending
    const btnP = document.createElement("button");
    btnP.className = "icon-btn icon-pending";
    btnP.textContent = "↩️";
    btnP.title = "Move to Pending";
    btnP.onclick = () => markPending(i);

    // ❌ delete
    const btnD = document.createElement("button");
    btnD.className = "icon-btn icon-delete";
    btnD.textContent = "🗑️";
    btnD.title = "Delete";
    btnD.onclick = () => deleteTask(i);

    actions.append(btnC, btnP, btnD);
    li.append(span, actions);


    if (activeFilter === "all") {
      if (task.status === "pending") {
        document.getElementById("pendingList_all").appendChild(li);
        document.querySelector("#allView .section-title:nth-of-type(1)").style.display = "block";
      } else {
        document.getElementById("completedList_all").appendChild(li);
        document.querySelector("#allView .section-title:nth-of-type(2)").style.display = "block";
      }
    }

    if (activeFilter === "pending" && task.status === "pending") {
      document.getElementById("pendingList_only").appendChild(li);
      document.querySelector("#pendingView .section-title").style.display = "block";
    }

    if (activeFilter === "completed" && task.status === "completed") {
      document.getElementById("completedList_only").appendChild(li);
      document.querySelector("#completedView .section-title").style.display = "block";
    }
  });

  // update counters
  const p = tasks.filter(t => t.status === "pending").length;
  const c = tasks.filter(t => t.status === "completed").length;
  document.getElementById("pendingCount").innerText = p;
  document.getElementById("completedCount").innerText = c;
  document.getElementById("allCount").innerText = tasks.length;
  document.getElementById("remainingCount").innerText = p;
}


document.addEventListener("DOMContentLoaded", () => {
  setFilter("all");
});
