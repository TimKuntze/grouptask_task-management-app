function generateTask(task) {
    let avatarImage = JSON.parse(task.assigned)[0].pic;
    let avatarName = JSON.parse(task.assigned)[0].name;
    return `<div class="todoTasks allTasks done" id="todoTasks${id}" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteDoneTask()" src="img/x-mark-3-16.png"></div>
        <div class="tooltip">
        <div class="avatar" id="avatar"><img src="${avatarImage}"></div>
        <span class="tooltiptext-name">${avatarName}</span>
        </div>
        <div class="taskDate" id="taskDate">${task.date}</div>
        <div class="taskTitle" id="taskTitle">${task.title}</div>
        <div class="taskDescription" id="taskDescription"><span>${task.description}</span></div>
        <div class="taskCategory" id="taskCategory">${task.category}</div>
        </div>`;
}