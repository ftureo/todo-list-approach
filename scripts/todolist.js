const mainContainer = document.getElementById('todo-list-container');
const form = document.getElementById('todo-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

document.addEventListener('DOMContentLoaded', renderTasks);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        removeTask(e.target.parentElement.getAttribute('data-id'));
    } else if (e.target.classList.contains('todo-item')) {
        toggleCompleteTask(e.target.getAttribute('data-id'));
    }
});


function addTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescInput.value.trim();
    if (title === '') return;

    const task = {
        id: Date.now().toString(),
        title,
        description,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskTitleInput.value = '';
    taskDescInput.value = '';
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleCompleteTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('todo-item');
        taskElement.setAttribute('data-id', task.id);
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
                <span class="tick">✔</span>
                <span>${task.title}</span>
                <button class="remove-btn">X</button>
            `;
        todoList.appendChild(taskElement);
    });
}

