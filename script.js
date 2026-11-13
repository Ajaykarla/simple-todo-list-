const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");
const clearButton = document.getElementById("clear-completed");

let tasks = [];

function renderTasks() {
  list.innerHTML = "";
  const activeCount = tasks.filter(task => !task.completed).length;
  count.textContent = `${activeCount} task${activeCount === 1 ? "" : "s"} remaining`;

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No tasks yet. Add your first task above!";
    list.appendChild(empty);
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement("li");
    item.className = `task${task.completed ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark ${task.text} as completed`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      tasks = tasks.filter(current => current.id !== task.id);
      renderTasks();
    });

    item.append(checkbox, text, remove);
    list.appendChild(item);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  input.value = "";
  input.focus();
  renderTasks();
});

clearButton.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
});

renderTasks();
