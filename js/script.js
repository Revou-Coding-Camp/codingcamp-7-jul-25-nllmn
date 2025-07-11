let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const dueDateInput = document.getElementById('due-date-input');
  if (taskInput.value === '' || dueDateInput.value === '') {
    alert('Please fill in both task and due date.');
    return;
  }

  const newTask = {
    id: Date.now(),
    task: taskInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  dueDateInput.value = '';
  saveTasks();
  displayTasks();
}

function displayTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const filter = document.getElementById('search-input').value.toLowerCase();

  let filteredTasks = tasks;
  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }
  if (filter) {
    filteredTasks = filteredTasks.filter(task => task.task.toLowerCase().includes(filter));
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<p class="text-center text-gray-400">Task is Empty!</p>';
    return;
  }

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = "flex justify-between items-center bg-gray-100 rounded px-4 py-3 shadow";
    taskItem.innerHTML = `
      <div class="flex flex-col text-left">
        <span class="${task.completed ? 'line-through text-gray-500' : 'text-lg'}">${task.task}</span>
        <span class="text-sm text-gray-400">${task.dueDate}</span>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleTaskCompletion(${task.id})" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="deleteTask(${task.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveTasks();
    displayTasks();
  }
}

function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    displayTasks();
  }
}

function filterTasks(type) {
  if (type === 'completed' || type === 'all') {
    currentFilter = type;
  }
  displayTasks();
}

window.onload = displayTasks;