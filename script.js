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

    resetPage();
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
        alert('Your task was not created. Please, fill out all the fields.')
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
        alert('You added a task successfully!')
    }
}

function resetPage() {
    document.getElementById('titleInput').value = ``;
    document.getElementById('categorySelector').value = `Select a category:`;
    document.getElementById('taskDescription').value = ``
    document.getElementById('urgencySelector').value = `Select the urgency:`

    setTodaysDate();
}