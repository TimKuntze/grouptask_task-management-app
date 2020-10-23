let allTasks = [];

function displayBacklog() {
    loadTasksFromLocalStorage();
    transformToJSON();
    document.getElementById('assign-container').innerHTML = "";
    for (let id = 0; id < allTasks.length; id++) {
        let task = allTasks[id];
        let avatarImage = JSON.parse(task.assigned)[0].pic;

        let assign_bar =
            `<div class="assign-task"> 
    <img class="assign-picture" src="${avatarImage}">
    <div class="backlog-name-input">
    <input id="name${id}" placeholder="Name">
    <input id="email${id}" placeholder="@mail">
    </div>
    <div class="backlog-category-input"> <input id="category${id}" placeholder="Category"> </div>
    <div class="backlog-details-input"> <input id="details${id}" placeholder="Details">
    </div>
    <div class="add-btn"> <button onclick="addTask()"> + </button>
    </div>`;

        document.getElementById('assign-container').insertAdjacentHTML('beforeend', assign_bar);
        console.log(allTasks[id]);

    }
}

function transformToJSON() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}

function loadTasksFromLocalStorage() {
    allTasks = JSON.parse(localStorage.getItem('allTasks'));

    if (allTasks == null) {
        allTasks = [];
    }
}