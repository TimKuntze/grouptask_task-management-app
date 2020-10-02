let alltasks = [];
let id = 1;

let titleValue;
let categoryValue;
let descriptionValue;
let dateValue;
let urgencyValue;
let task;

function setTodaysDate() {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#dateInput").value = today;
}

function createTaskJSON() {
    gatherTasksData();
    assignJSONToVariable();

    id++

    /* Only for information */
    console.log(alltasks)


}

function gatherTasksData() {
    titleValue = document.getElementById('titleInput').value;
    categoryValue = document.getElementById('categorySelector').value;
    descriptionValue = document.getElementById('taskDescription').value;
    urgencyValue = document.getElementById('urgencySelector').value;
    dateValue = document.querySelector("#dateInput").value;
}

function assignJSONToVariable() {

    if (!(titleValue != '' & categoryValue != 'Select a category:' & descriptionValue != '' & urgencyValue != 'Select the urgency:')) {

        var arg = 'taskNotCreatedAlert';
        alertController(arg);

    } else {
        task = {
            "title": `${titleValue}`,
            "category": `${categoryValue}`,
            "description": `${descriptionValue}`,
            "date": `${dateValue}`,
            "urgency": `${urgencyValue}`,
            "status": `to do`,
            /* Next it will be created a databank of people that can be assigned for a task */
            /* Name, e-mail and avatar's pic */
            "assigned": `responsablesArray`,
            "id": `${id}`
        };
        alltasks.push(task);
        resetPage();
        var arg = 'taskCreatedAlert';
        alertController(arg);
    }
}

function resetPage() {
    document.getElementById('titleInput').value = ``;
    document.getElementById('categorySelector').value = `Select a category:`;
    document.getElementById('taskDescription').value = ``
    document.getElementById('urgencySelector').value = `Select the urgency:`

    setTodaysDate();
}

function alertController(parameter) {
    var controller = document.getElementById(parameter);
    controller.classList.remove('dHide')
    setTimeout(function() {
        controller.classList.add('dHide');
    }, 3000);
}

/*Javascript for Dashboard - STILL IN PROGRESS*/

/*JSON for testing purposes*/

let testJSON = [{
        "title": "TitleA",
        "category": "CategoryA",
        "description": "CategoryA",
        "date": "DateA",
        "urgency": "UrgencyA",
    },
    {
        "title": "TitleB",
        "category": "CategoryB",
        "description": "CategoryB",
        "date": "DateB",
        "urgency": "UrgencyB",
    },
    {
        "title": "TitleC",
        "category": "CategoryC",
        "description": "CategoryC",
        "date": "DateC",
        "urgency": "UrgencyC",
    }
];

/*Pushing filled task-JSON into dashboard*/

function displayTasks() {
    let toDoList = getElementById('todoColumn');
    for (let id = 0; id < testJSON.length; id++) {
        let listToDoTasks = document.createElement('div');
        let testJSONItem = testJSON[id];
        listToDoTasks.innerHTML = `
        <div class="todoTasks allTasks urgencyLow" draggable="true" ondragstart="drag(event)" id="todoTasks">
        <div onclick="deleteTask()" class="deleteTask" id="deleteTask"><img src="img/x-mark-3-16.png"></div>
        <div class="taskDate" id="taskDate">${testJSONItem.date}</div>
        <div class="taskTitle" id="taskTitle">${testJSONItem.title}</div>
        <div class="taskDescription" id="taskDescription"><span>${testJSONItem.description}</span></div>
        <div class="taskCategory" id="taskCategory">${testJSONItem.category}</div>
        </div>
        `;
        toDoList.appendChild(listToDoTasks);
    }
}

/*Adding a colored border to the dashboard tasks depending on the tasks urgency*/

function addUrgencyColor() {}

/*Function for drag&drop of single tasks in dashboard*/

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

/*Deleting a task*/

function deleteTask() {}
