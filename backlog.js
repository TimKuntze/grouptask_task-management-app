

let allTasks = [];

function addTask() {

    let first_name = document.getElementById('name-1').value;
    let first_email = document.getElementById('email-1').value;
    let first_category = document.getElementById('category-1').value;
    let first_details = document.getElementById('details-1').value;

    let second_name = document.getElementById('name-2').value;
    let second_email = document.getElementById('email-2').value;
    let second_category = document.getElementById('category-2').value;
    let second_details = document.getElementById('details-2').value;

    let third_name = document.getElementById('name-3').value;
    let third_email = document.getElementById('email-3').value;
    let third_category = document.getElementById('category-3').value;
    let third_details = document.getElementById('details-3').value;

    let fourth_name = document.getElementById('name-4').value;
    let fourth_email = document.getElementById('email-4').value;
    let fourth_category = document.getElementById('category-4').value;
    let fourth_details = document.getElementById('details-4').value;

    let task_1 = {
        'Name': first_name,
        'Email': first_email,
        'Category': first_category,
        'Details': first_details,
        'SubmitAt': new Date().getTime(),
    };

    let task_2 = {
        'Name': second_name,
        'Email': second_email,
        'Category': second_category,
        'Details': second_details,
        'SubmitAt': new Date().getTime(),
    };

    let task_3 = {
        'Name': third_name,
        'Email': third_email,
        'Category': third_category,
        'Details': third_details,
        'SubmitAt': new Date().getTime(),
    };

    let task_4 = {
        'Name': fourth_name,
        'Email': fourth_email,
        'Category': fourth_category,
        'Details': fourth_details,
        'SubmitAt': new Date().getTime(),
    };

    allTasks.push(task_1);
    allTasks.push(task_2);
    allTasks.push(task_3);
    allTasks.push(task_4);

    let allTasksAsString = JSON.stringify(allTasks);

    localStorage.setItem('allTasks', allTasksAsString);
}