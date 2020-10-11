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

/**
 * This let array the data of all users.
 *  @Type - Array
 */
let users = [{
        'name': 'Átila Oliveira',
        'password': 'atilaspassword',
        'pic': './img/avatarAtila.jpg',
        'email': 'atila.oliveira.jr@gmail.com'
    },
    {
        'name': 'Hong Hanh Chu',
        'pic': './img/avatarHongHanh.jpg',
        'password': 'honghanhspassword',
        'email': 'hong.hanh.chu@gmail.com'
    },
    {
        'name': 'Tim Kuntze',
        'pic': './img/TimKuntze.jpg',
        'email': 'tim.kuntze@gmail.com'
    }
];

/**
 * This array stores the data of users assigned to a certain task.
 *  @Type - Array
 */
let selectedUsers = [];

let titleValue;
let categoryValue;
let descriptionValue;
let dateValue;
let urgencyValue;
let assignedUsersAsString;


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
        "assigned": `${assignedUsersAsString}`,
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
    document.getElementById('taskDescription').value = ``;
    document.getElementById('urgencySelector').value = `Select the urgency:`;
    selectedUsers = [];

    setTodaysDate();
    resetClassAvatarAssigned();

}

/**
 * set the value of ''(empty) for the <img class="avatarAssigned"> after creating a task.
 * @function
 */
function resetClassAvatarAssigned() {
    var arr = Array.prototype.slice.call(document.getElementsByClassName('avatarAssigned'));
    arr.forEach(function(element) {
        element.remove();
    });
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

/**
 * Displays the list of users that can be assigned to the task.
 * @function
 */
function displayAssignedToList() {
    document.getElementById('assignedToList').classList.remove('dHide');
    document.getElementById('assignedToArea').classList.add('dHide');
    displayUsersList();
}

/**
 * Displays the list of users that were assigned to the task.
 * @function
 */
function assingendToConfirm() {
    document.getElementById('assignedToList').classList.add('dHide');
    document.getElementById('assignedToArea').classList.remove('dHide');
    document.getElementById('usersList').innerHTML = '';
    document.getElementById('avatarPicsArea').innerHTML = '';
    displayAssignedUsers();
    assignedUsersAsString = JSON.stringify(selectedUsers);
}

/**
 * Builds the list of users that were assigned to the task.
 * @function
 */
function displayAssignedUsers() {
    let html = '';
    selectedUsers.forEach(function(user) {
        html += `<div><img class="avatarAssigned" id="avatarPic" src="${user.pic}"></div>`
    })
    html += `<div class="avatarPlusBtnContainer"><img class="avatarPlusBtn" id="avatarPic" src="./img/icon plus.png" onclick="displayAssignedToList()"></div>`;
    document.getElementById('avatarPicsArea').insertAdjacentHTML('afterbegin', html);
}

/**
 * Builds the list of available users that can be assigned to a task.
 * @function
 */
function displayUsersList() {
    let html = '';
    selectedUsers = [];
    users.forEach(function(user) {
        html += `<li class="" id="${user.name}" onclick="selectUser('${user.name}')" >${user.name}</li>`;
    })

    html += '<li id="assingendToConfirmBtn" onclick="assingendToConfirm()">Confirm</li>';

    document.getElementById('usersList').insertAdjacentHTML('afterbegin', html);
}

/**
 * Pushes the selected users to the array selectedUsers.
 * @function
 */
function selectUser(userName) {
    let isSelected = document.getElementById(userName).classList.contains('userSelected');

    if (!isSelected) {
        document.getElementById(userName).classList.add('userSelected');
        let userFilter = user => user.name === userName;
        let userJSON = users.filter(userFilter)
        selectedUsers.push(userJSON[0]);

    } else {
        document.getElementById(userName).classList.remove('userSelected');
        let userFilter = user => user.name === userName;
        let userJSON = users.filter(userFilter)
        let removed = selectedUsers.indexOf(userJSON[0]);
        selectedUsers.splice(removed, 1);
    }
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
    transformToJSON();
    document.getElementById('todoColumn').innerHTML = "";
    for (let id = 0; id < alltasks.length; id++) {

        let listToDoTasks = `<div class="todoTasks allTasks ${alltasks[id].urgency}" id="todoTasks" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteTask()" src="img/x-mark-3-16.png"></div>
        <div class="taskDate" id="taskDate">${alltasks[id].date}</div>
        <div class="taskTitle" id="taskTitle">${alltasks[id].title}</div>
        <div class="taskDescription" id="taskDescription"><span>${alltasks[id].description}</span></div>
        <div class="taskCategory" id="taskCategory">${alltasks[id].category}</div>
        </div>`;

        document.getElementById('todoColumn').insertAdjacentHTML('beforeend', listToDoTasks);
    }
}

/*Deleting a task*/

function deleteTask(id) {
    alltasks.splice(id, 1);

}

/*Adding a colored border to the dashboard tasks depending on the tasks urgency

function addUrgencyColor() {

    transformToJSON();

    console.log(alltasks[id].urgency);

    for (let id = 0; id < alltasks.length; id++) {
        if (alltasks[id].urgency == 'Low') {
            document.getElementById('todoTasks').classList.add('urgencyLow');
        }
        if (alltasks[id].urgency == 'Medium') {
            document.getElementById('todoTasks').classList.add('urgencyMedium');
        }
        if (alltasks[id].urgency == 'High') {
            document.getElementById('todoTasks').classList.add('urgencyHigh');
        }
    }
}
*/

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



/*Function to stringify JSON for local storage*/

function transformToString() {
    let alltasksAsString = JSON.stringify(alltasks);
    localStorage.setItem('alltasks', alltasksAsString);
}

/*Function to de-stringify JSON*/

function transformToJSON() {
    let alltasksAsString = localStorage.getItem('alltasks');
    alltasks = JSON.parse(alltasksAsString);
}