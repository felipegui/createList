const qs = (element) => document.querySelector(element);

const inputTask = qs('.input-task');
const btnTask = qs('.btn-task');
const tasks = qs('.tasks');

function createTagLi() {
    const tagLi = document.createElement('li');
    return tagLi;
}

function createTask(inputTaskValue) {
    const li = createTagLi();
    li.innerText = inputTaskValue;
    tasks.appendChild(li);
    createButtonDel(li);
    saveTasks();
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const listTasks = [];

    for (let task of liTasks) {
        let textTask = task.innerText;
        textTask = textTask.replace('Apagar', '').trim();
        listTasks.push(textTask);
    }
    const tasksJSON = JSON.stringify(listTasks);
    //no localStorage, vc só pode salvar dados do tipo string
    localStorage.setItem('tasks', tasksJSON);
}

function clearInput() {
    inputTask.value = "";
    inputTask.focus();
}

function createButtonDel(li) {
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Apagar';
    btnDelete.setAttribute('class', 'delete');
    btnDelete.setAttribute('title', 'Apagar item');
    li.appendChild(btnDelete);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const todoList = JSON.parse(tasks);
    for (let task of todoList) createTask(task);
}

addSavedTasks();

inputTask.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
        if (inputTask.value === "") return;
        createTask(inputTask.value);
        clearInput();
    }
});

btnTask.addEventListener('click', function (event) {
    if (inputTask.value === "") return;
    createTask(inputTask.value);
    clearInput();
});

//um truque para saber em que elemento está clicando
document.addEventListener('click', function (event) {
    const element = event.target;
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
        saveTasks();
    }
});