function backlog() {
    document.getElementById('backlog-container').classList.remove('d-none');
    document.getElementById('backlog-container').classList.add('backlog-container');
}

    function submitTaskBacklog(event) {


        console.log(event.target['name'].value);
        console.log(event.target['email'].value);
    }