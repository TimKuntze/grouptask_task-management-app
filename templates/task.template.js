function generateTask(task) {
    let avatarImage = JSON.parse(task.assigned)[0].pic;
    return `<div class="todoTasks allTasks ${task.urgency}" id="todoTasks" draggable="true" ondragstart="drag(event)">
        <div class="deleteTask" id="deleteTask"><img onclick="deleteDoneTask()" src="img/x-mark-3-16.png"></div>
        <div class="pushTask" id="pushTask"><img onclick="pushTaskToProgress(${id})" src="img/arrow-61-16.png"></div>
        <div class="avatar" id="avatar"><img src="${avatarImage}"></div>
        <div class="taskDate" id="taskDate">${task.date}</div>
        <div class="taskTitle" id="taskTitle">${task.title}</div>
        <div class="taskDescription" id="taskDescription"><span>${task.description}</span></div>
        <div class="taskCategory" id="taskCategory">${task.category}</div>
        </div>`;
}