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
    addToLocalStorage(); 

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
    return !(titleValue != '' & categoryValue != 'Select a category:' & descriptionValue != '' & urgencyValue != 'Select the urgency:' & selectedUsers.length > 0);
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


//*JAVASCRIPT FOR DASHBOARD STARTS HERE - STILL IN PROGRESS

/**
 * This array stores all the tasks pushed into the inProgress category.
 * @Type - Array
 */
let inProgressTasks = [];

/**
 * This array stores all the tasks pushed into the inTesting category.
 * @Type - Array
 */
let inTestingTasks = [];

/**
 * This array stores all the tasks pushed into the done category.
 * @Type - Array
 */
let doneTasks = [];

/**
 * //*Displaying of ToDo Tasks.
 * @function
 */
function displayTasks() {

    //*Get ToDo item from local storage.
    let alltasksAsString = localStorage.getItem('alltasks');
    alltasks = JSON.parse(alltasksAsString);
    if (alltasks == null) {
        alltasks = [];
    }

    //*Clearing ToDo Column.
    document.getElementById('todoColumn').innerHTML = "";

    //*Displaying of ToDo Tasks.
    for (let id = 0; id < alltasks.length; id++) {
        let avatarImage = JSON.parse(alltasks[id].assigned)[0].pic;
        let avatarName = JSON.parse(alltasks[id].assigned)[0].name;
        let listToDoTasks = `<div class="todoTasks allTasks ${alltasks[id].urgency} id="todoTasks" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteToDoTask(${id})" src="img/x-mark-3-16.png"></div>
        <div class="pushTask" id="pushTask"><img onclick="pushTaskToProgress(${id})" src="img/arrow-61-16.png"></div>
        <div class="tooltip">
        <div class="avatar" id="avatar"><img src="${avatarImage}"></div>
        <span class="tooltiptext-name">${avatarName}</span>
        </div>
        <div class="taskDate" id="taskDate">${alltasks[id].date}</div>
        <div class="taskTitle" id="taskTitle">${alltasks[id].title}</div>
        <div class="taskDescription" id="taskDescription"><span>${alltasks[id].description}</span></div>
        <div class="taskCategory" id="taskCategory">${alltasks[id].category}</div>
        </div>`;
        document.getElementById('todoColumn').insertAdjacentHTML('beforeend', listToDoTasks);
    }
}

/**
 * //*Displaying of InProgress Column
 * @function
 */
function displayInProgress() {

    //*Get InProgress item from local storage.
    let inProgressAsString = localStorage.getItem('inProgressTasks');
    inProgressTasks = JSON.parse(inProgressAsString);
    if (inProgressTasks == null) {
        inProgressTasks = [];
    }

    //*Clearing InProgress Column.
    document.getElementById('inprogressColumn').innerHTML = "";

    //*Displaying of InProgress Tasks.
    for (let id = 0; id < inProgressTasks.length; id++) {
        let avatarImage = JSON.parse(inProgressTasks[id].assigned)[0].pic;
        let avatarName = JSON.parse(inProgressTasks[id].assigned)[0].name;
        let listInProgressTasks = `<div class="todoTasks allTasks ${inProgressTasks[id].urgency}" id="todoTasks" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteInProgressTask(${id})" src="img/x-mark-3-16.png"></div>
        <div class="pushTask" id="pushTask"><img onclick="pushTaskToInTesting(${id})" src="img/arrow-61-16.png"></div>
        <div class="tooltip">
        <div class="avatar" id="avatar"><img src="${avatarImage}"></div>
        <span class="tooltiptext-name">${avatarName}</span>
        </div>
        <div class="taskDate" id="taskDate">${inProgressTasks[id].date}</div>
        <div class="taskTitle" id="taskTitle">${inProgressTasks[id].title}</div>
        <div class="taskDescription" id="taskDescription"><span>${inProgressTasks[id].description}</span></div>
        <div class="taskCategory" id="taskCategory">${inProgressTasks[id].category}</div>
        </div>`;
        document.getElementById('inprogressColumn').insertAdjacentHTML('beforeend', listInProgressTasks);
    }
}

/**
 * //*Displaying of InTesting Column
 * @function
 */
function displayInTesting() {

    //*Get InTesting item from local storage.
    let inTestingAsString = localStorage.getItem('inTestingTasks');
    inTestingTasks = JSON.parse(inTestingAsString);
    if (inTestingTasks == null) {
        inTestingTasks = [];
    }

    //*Clearing InTesting Column.
    document.getElementById('intestingColumn').innerHTML = "";

    //*Displaying of InTesting Tasks.
    for (let id = 0; id < inTestingTasks.length; id++) {
        let avatarImage = JSON.parse(inTestingTasks[id].assigned)[0].pic;
        let avatarName = JSON.parse(inTestingTasks[id].assigned)[0].name;
        let listInTestingTasks = `<div class="todoTasks allTasks ${inTestingTasks[id].urgency}" id="todoTasks" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteInTestingTask(${id})" src="img/x-mark-3-16.png"></div>
        <div class="pushTask" id="pushTask"><img onclick="pushTaskToDone(${id})" src="img/arrow-61-16.png"></div>
        <div class="tooltip">
        <div class="avatar" id="avatar"><img src="${avatarImage}"></div>
        <span class="tooltiptext-name">${avatarName}</span>
        </div>
        <div class="taskDate" id="taskDate">${inTestingTasks[id].date}</div>
        <div class="taskTitle" id="taskTitle">${inTestingTasks[id].title}</div>
        <div class="taskDescription" id="taskDescription"><span>${inTestingTasks[id].description}</span></div>
        <div class="taskCategory" id="taskCategory">${inTestingTasks[id].category}</div>
        </div>`;
        document.getElementById('intestingColumn').insertAdjacentHTML('beforeend', listInTestingTasks);
    }
}

/**
 * //*Displaying of Done Column
 * @function
 */
function displayDone() {

    //*Get Done item from local storage.
    let doneAsString = localStorage.getItem('doneTasks');
    doneTasks = JSON.parse(doneAsString);
    if (doneTasks == null) {
        doneTasks = [];
    }

    //*Clearing Done Column.
    document.getElementById('doneColumn').innerHTML = "";

    //*Displaying of Done Tasks.
    for (let id = 0; id < doneTasks.length; id++) {

        let listDoneTasks = generateTask(doneTasks[id]);
        document.getElementById('doneColumn').insertAdjacentHTML('beforeend', listDoneTasks);
    }
}

/**
 * //*Deleting of a ToDo task.
 * @function
 */
function deleteToDoTask(id) {

    //*Get ToDo item from local storage.
    let alltasksAsString = localStorage.getItem('alltasks');
    alltasks = JSON.parse(alltasksAsString);
    if (alltasks == null) {
        alltasks = [];
    }

    //*Delete item from according array. 
    alltasks.splice(id, 1);
    addToLocalStorage();
    displayTasks();
}

/**
 * //*Deleting of an InProgress task.
 * @function
 */
function deleteInProgressTask(id) {

    //*Get InProgress item from local storage.
    let inProgressAsString = localStorage.getItem('inProgressTasks');
    inProgressTasks = JSON.parse(inProgressAsString);
    if (inProgressTasks == null) {
        inProgressTasks = [];
    }

    //*Delete item from according array. 
    inProgressTasks.splice(id, 1);

    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();
    displayTasks();
}

/**
 * //*Deleting of an InTesting task.
 * @function
 */
function deleteInTestingTask(id) {

    //*Get InProgress item from local storage.
    let inTestingAsString = localStorage.getItem('inTestingTasks');
    inTestingTasks = JSON.parse(inTestingAsString);
    if (inTestingTasks == null) {
        inTestingTasks = [];
    }

    //*Delete item from according array. 
    inTestingTasks.splice(id, 1);

    //*Pushing InProgress array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInProgress();
    displayInTesting();
    displayTasks();
}

/**
 * //*Deleting of a Done task.
 * @function
 */
function deleteDoneTask(id) {

    //*Get Done item from local storage.
    let doneAsString = localStorage.getItem('doneTasks');
    doneTasks = JSON.parse(doneAsString);
    if (doneTasks == null) {
        doneTasks = [];
    }

    //*Delete item from according array. 
    doneTasks.splice(id, 1);

    //*Pushing Done array into local storage
    doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    displayInProgress();
    displayInTesting();
    displayTasks();
    displayDone();
}

/**
 * //*Pushing a ToDo Task into the InProgress Array.
 * @function
 */
function pushTaskToProgress(id) {

    //*Get ToDo item from local storage.
    let alltasksAsString = localStorage.getItem('alltasks');
    alltasks = JSON.parse(alltasksAsString);
    if (alltasks == null) {
        alltasks = [];
    }

    //*Pushing selected task into InProgress array
    inProgressTasks.push(alltasks[id]);

    //*Pushing InProgress array into local storage
    let inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    //*Deleting of selected item from ToDo array and update
    alltasks.splice(id, 1);
    addToLocalStorage();
    displayTasks();
    displayInProgress();
}

/**
 * //*Pushing a InProgress Task into the InTesting Array.
 * @function
 */
function pushTaskToInTesting(id) {

    //*Get InProgress item from local storage.
    let inProgressAsString = localStorage.getItem('inProgressTasks');
    inProgressTasks = JSON.parse(inProgressAsString);
    if (inProgressTasks == null) {
        inProgressTasks = [];
    }

    //*Pushing selected task into InTesting array
    inTestingTasks.push(inProgressTasks[id]);

    //*Pushing InTesting array into local storage
    let inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    //*Deleting of selected item from InProgress array and update
    inProgressTasks.splice(id, 1);

    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    addToLocalStorage();

    displayTasks();
    displayInProgress();
    displayInTesting();
}

/**
 * //*Pushing a InTesting Task into the Done Array.
 * @function
 */
function pushTaskToDone(id) {

    //*Get InTesting item from local storage.
    let inTestingAsString = localStorage.getItem('inTestingTasks');
    inTestingTasks = JSON.parse(inTestingAsString);
    if (inTestingTasks == null) {
        inTestingTasks = [];
    }

    //*Pushing selected task into Done array
    doneTasks.push(inTestingTasks[id]);

    //*Pushing Done array into local storage
    let doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    //*Deleting of selected item from InTesting array and update
    inTestingTasks.splice(id, 1);

    //*Pushing InTesting array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);



    displayTasks();
    displayInProgress();
    displayInTesting();
    displayDone();
}



/**
 * //*Function for drag&drop of single tasks in dashboard
 * @function
 */
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

/**
 * //*Function to put all tasks from Add Tasks into the local storage. 
 * @function
 */
function addToLocalStorage() {
    let alltasksAsString = JSON.stringify(alltasks);
    localStorage.setItem('alltasks', alltasksAsString);
}

/**
 * //*Function to sort ToDo tasks after the category. 
 * @function
 */
function toDoSortingCategory() {

    alltasks.sort(function(a, b) {
        return a.category.localeCompare(b.category);
    });

    addToLocalStorage();
    displayTasks();
}

/**
 * //*Function to sort ToDo tasks after the date. 
 * @function
 */
function toDoSortingDate() {

    alltasks.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });

    addToLocalStorage();
    displayTasks();

}

/**
 * //*Function to sort ToDo tasks after the title. 
 * @function
 */
function toDoSortingTitle() {

    alltasks.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });

    addToLocalStorage();
    displayTasks();

}

/**
 * //*Function to sort ToDo tasks after the User. 
 * @function
 */
function toDoSortingUser() {

    alltasks.sort(function(a, b) {
        return a.assigned.localeCompare(b.assigned);
    });

    addToLocalStorage();
    displayTasks();

}

/**
 * //*Function to sort ToDo tasks after the User. 
 * @function
 */
function toDoSortingUrgency() {

    alltasks.sort(function(a, b) {
        return a.urgency.localeCompare(b.urgency);
    });

    addToLocalStorage();
    displayTasks();

}

/**
 * //*Function to sort InProgress tasks after the category. 
 * @function
 */
function inProgressSortingCategory() {

    inProgressTasks.sort(function(a, b) {
        return a.category.localeCompare(b.category);
    });


    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();

}

/**
 * //*Function to sort InProgress tasks after the date. 
 * @function
 */
function inProgressSortingDate() {

    inProgressTasks.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });


    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();

}

/**
 * //*Function to sort InProgress tasks after the title. 
 * @function
 */
function inProgressSortingTitle() {

    inProgressTasks.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });


    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();

}

/**
 * //*Function to sort InProgress tasks after the urgency. 
 * @function
 */
function inProgressSortingUrgency() {

    inProgressTasks.sort(function(a, b) {
        return a.urgency.localeCompare(b.urgency);
    });


    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();

}

/**
 * //*Function to sort InProgress tasks after the user. 
 * @function
 */
function inProgressSortingUser() {

    inProgressTasks.sort(function(a, b) {
        return a.assigned.localeCompare(b.assigned);
    });


    //*Pushing InProgress array into local storage
    inProgressAsString = JSON.stringify(inProgressTasks);
    localStorage.setItem('inProgressTasks', inProgressAsString);

    displayInProgress();

}

/**
 * //*Function to sort InTesting tasks after the category. 
 * @function
 */
function inTestingSortingCategory() {

    inTestingTasks.sort(function(a, b) {
        return a.category.localeCompare(b.category);
    });


    //*Pushing InTesting array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInTesting();

}

/**
 * //*Function to sort InTesting tasks after the date. 
 * @function
 */
function inTestingSortingDate() {

    inTestingTasks.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });


    //*Pushing InTesting array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInTesting();

}

/**
 * //*Function to sort InTesting tasks after the title. 
 * @function
 */
function inTestingSortingTitle() {

    inTestingTasks.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });


    //*Pushing InTesting array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInTesting();

}

/**
 * //*Function to sort InProgress tasks after the urgency. 
 * @function
 */
function inTestingSortingUrgency() {

    inTestingTasks.sort(function(a, b) {
        return a.urgency.localeCompare(b.urgency);
    });


    //*Pushing InTesting array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInTesting();

}

/**
 * //*Function to sort InTesting tasks after the user. 
 * @function
 */
function inTestingSortingUser() {

    inTestingTasks.sort(function(a, b) {
        return a.assigned.localeCompare(b.assigned);
    });


    //*Pushing InProgress array into local storage
    inTestingAsString = JSON.stringify(inTestingTasks);
    localStorage.setItem('inTestingTasks', inTestingAsString);

    displayInTesting();

}

/**
 * //*Function to sort done tasks after the category. 
 * @function
 */
function doneSortingCategory() {

    doneTasks.sort(function(a, b) {
        return a.category.localeCompare(b.category);
    });


    //*Pushing done array into local storage
    doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    displayDone();

}

/**
 * //*Function to sort done tasks after the date. 
 * @function
 */
function doneSortingDate() {

    doneTasks.sort(function(a, b) {
        return a.date.localeCompare(b.date);
    });


    //*Pushing done array into local storage
    doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    displayDone();

}

/**
 * //*Function to sort InTesting tasks after the title. 
 * @function
 */
function doneSortingTitle() {

    doneTasks.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });


    //*Pushing done array into local storage
    doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    displayDone();

}

/**
 * //*Function to sort done tasks after the user. 
 * @function
 */
function doneSortingUser() {

    doneTasks.sort(function(a, b) {
        return a.assigned.localeCompare(b.assigned);
    });


    //*Pushing done array into local storage
    doneAsString = JSON.stringify(doneTasks);
    localStorage.setItem('doneTasks', doneAsString);

    displayDone();

}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownToDo() {
    document.getElementById("sortingDropdownToDo").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.filter-image')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownInProgress() {
    document.getElementById("sortingDropdownInProgress").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.filter-image')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownInTesting() {
    document.getElementById("sortingDropdownInTesting").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.filter-image')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownDone() {
    document.getElementById("sortingDropdownDone").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.filter-image')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function removeNavList() {
    document.getElementById('navListMobile').classList.add('dHide');
}
