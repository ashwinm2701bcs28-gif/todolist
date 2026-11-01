let tasks = [];   // each task: { id, text, completed }

const taskInput = document.getElementById('taskInput');
const taskList  = document.getElementById('taskList');
const message   = document.getElementById('message');
const counter   = document.getElementById('counter');

/* ---------- 1. Add a new task dynamically ---------- */
function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    message.textContent = 'Please enter a task before adding.';
    return;
  }

  message.textContent = '';
  tasks.push({ id: Date.now(), text: text, completed: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

/* ---------- 2. Update task status (completed / not completed) ---------- */
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { id: task.id, text: task.text, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

/* ---------- 3. Remove a task from the list ---------- */
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

/* ---------- Display the tasks in a list ---------- */
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = function () { toggleTask(task.id); };

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.onclick = function () { toggleTask(task.id); };

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.onclick = function () { deleteTask(task.id); };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

function updateCounter() {
  const total = tasks.length;
  const done = tasks.filter(function (t) { return t.completed; }).length;

  if (total === 0) {
    counter.textContent = 'No tasks yet. Add your first task above.';
  } else {
    counter.textContent = done + ' of ' + total + ' tasks completed';
  }
}

/* Press Enter to add a task */
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') addTask();
});

renderTasks();
