/**
 * This array stores all the tasks created.
 * @Type - Array
 */
let alltasks = [];

/**
 * This is a serial number for every task ever created.
 */
let id = 1;


/**
 * This let stores a JSON obj.
 */
let task;

let titleValue;
let categoryValue;
let descriptionValue;
let dateValue;
let urgencyValue;


/**
 * Pre-sets the input 'Due Date' to the current date.
 * @function
 */
function setTodaysDate() {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelector("#dateInput").value = today;
}

/**
 * Gathers the data to build a JSON obj, creates a JSON obj, pushes it into the 'let allTasks'
 * and increse the serial number 'let id' in one.
 * @function
 */
function createTaskJSON() {

    gatherTasksData();

    assignJSONToVariable();

    id++

    /*transform JSON data to a string for local storage*/
    transformToString();

    /* Only for information */
    console.log(alltasks)

}

/**
 * Gathers the data to build a JSON obj.
 * @function
 */
function gatherTasksData() {
    titleValue = document.getElementById('titleInput').value;
    categoryValue = document.getElementById('categorySelector').value;
    descriptionValue = document.getElementById('taskDescription').value;
    urgencyValue = document.getElementById('urgencySelector').value;
    dateValue = document.querySelector("#dateInput").value;
}

/**
 * Creates a JSON obj, pushes it into the 'let allTasks'.
 * @function
 */
function assignJSONToVariable() {

    if (formIsValid()) {
        var alertID = 'taskNotCreatedAlert';
        alertController(alertID);

    } else {
        createATask();
        alltasks.push(task);
        resetPage();
        var alertID = 'taskCreatedAlert';
        alertController(alertID);

    }
}
/**
 * Validates if the form is filled out.
 * @function
 * @returns - Boolean True || Bollean False
 */
function formIsValid() {
    return !(titleValue != '' & categoryValue != 'Select a category:' & descriptionValue != '' & urgencyValue != 'Select the urgency:');
}

/**
 * Builds a JSON obj and stores it in the 'let task'.
 * @function
 */
function createATask() {
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
}

/**
 * Set the input field at the HTML to 'blank'.
 * @function
 */
function resetPage() {
    document.getElementById('titleInput').value = ``;
    document.getElementById('categorySelector').value = `Select a category:`;
    document.getElementById('taskDescription').value = ``
    document.getElementById('urgencySelector').value = `Select the urgency:`

    setTodaysDate();
}

/**
 * Display an alert to the user, if the request occurred successfully or not.
 * @function
 * @param {string} alertID - The kind of alert.
 */
function alertController(alertID) {
    var controller = document.getElementById(alertID);
    controller.classList.remove('dHide')
    setTimeout(function() {
        controller.classList.add('dHide');
    }, 3000);
}

/**
 * Displays the nav li, if @media (max-width: 520px).
 * @function
 */
function displayNavMobile() {
    var isHide = window.getComputedStyle(document.getElementById('navListMobile')).display;

    if (isHide == 'none') {
        document.getElementById('navListMobile').classList.remove('dHide');
    } else {
        document.getElementById('navListMobile').classList.add('dHide');
    }

}

function displayAssignedToList() {
    document.getElementById('assignedToList').classList.remove('dHide');
    document.getElementById('assignedToArea').classList.add('dHide');
}

function assingendToCancel() {
    document.getElementById('assignedToList').classList.add('dHide');
    document.getElementById('assignedToArea').classList.remove('dHide');
}

/*Javascript for Dashboard - STILL IN PROGRESS*/

/*JSON for testing purposes

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
];*/

/*Pushing filled task-JSON into dashboard*/

function displayTasks() {

    let alltasksAsString = localStorage.getItem('alltasks');
    alltasks = JSON.parse(alltasksAsString);
    for (let id = 0; id < alltasks.length; id++) {

        listToDoTasks = `<div class="todoTasks allTasks" draggable="true" ondragstart="drag(event)" id="todoTasks">
        <div onclick="deleteTask()" class="deleteTask" id="deleteTask"><img src="img/x-mark-3-16.png"></div>
        <div class="taskDate" id="taskDate">${alltasks[id]['date']}</div>
        <div class="taskTitle" id="taskTitle">${alltasks[id]['title']}</div>
        <div class="taskDescription" id="taskDescription"><span>${alltasks[id]['description']}</span></div>
        <div class="taskCategory" id="taskCategory">${alltasks[id]['category']}</div>
        </div>`;

        document.getElementById('todoColumn').insertAdjacentHTML('beforeend', listToDoTasks);
        addUrgencyColor();
    }
}

/*Adding a colored border to the dashboard tasks depending on the tasks urgency*/

function addUrgencyColor() {
    let urgency = alltasks[id + 'urgency'];
    if (urgency == 'Low') {
        document.getElementById('todoTasks').classList.add('urgencyLow')
    }
    if (urgency == 'Medium') {
        document.getElementById('todoTasks').classList.add('urgencyMedium')
    }
    if (urgency == 'High') {
        document.getElementById('todoTasks').classList.add('urgencyHigh')
    }
}

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

function deleteTask(id) {
    alltasks.splice(id, 1);
    displayTasks();
}

/*Function to stringify JSON for local storage*/

function transformToString() {
    let alltasksAsString = JSON.stringify(alltasks);
    localStorage.setItem('alltasks', alltasksAsString);
}
