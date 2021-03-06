// UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const errorDiv = document.querySelector('.error');
const errorMessage = document.querySelector('#errorMessage');
const closeErrorBtn = document.querySelector('#closeError');

// Load Event Listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add close error button event
    closeErrorBtn.addEventListener('click', function(e) { errorDiv.classList.add('hidden') });
    
    // Add task event
    form.addEventListener('submit', addTask);

    // Remove task event
    taskList.addEventListener('click', removeTask);

    // Clear Tasks
    clearBtn.addEventListener('click', clearTasks);

    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks
function getTasks(e) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => taskList.appendChild(generateLi(task)));
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        errorMessage.innerHTML = '<div style="display: inline; padding-left: 10px;">The \'New Task\' field cannot be blank</div>';
        errorDiv.classList.remove('hidden');

        e.preventDefault();
        return;
    }

    const li = generateLi(taskInput.value);

    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

// Generate <li>
function generateLi(task) {
    const li = document.createElement('li');
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(task));

    const link = document.createElement('a');
    link.classList.add('delete-item', 'secondary-content');
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    return li;
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        
        removeFromLocalStorage(e.target.parentElement.parentElement.innerText);
    }
}

// Remove From LocalStorage
function removeFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.splice(tasks.indexOf(task), 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
    let listItems = taskList.querySelectorAll('li');
    listItems.forEach(item => taskList.removeChild(item));

    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    let text = e.target.value;
    const regex = new RegExp(text, "gi");

    let listItems = taskList.querySelectorAll('li');
    listItems.forEach(item => {
        if(!item.textContent.match(regex)){
            item.classList.add('hidden');
        } else {
            if(item.classList.contains('hidden')) {
                item.classList.remove('hidden');
            }
        }
    })
}