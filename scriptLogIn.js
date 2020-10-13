let users = [{
        'name': 'Átila Oliveira',
        'userName': 'Oliveira',
        'password': '123',
        'pic': './img/avatarAtila.jpg',
        'email': 'atila.oliveira.jr@gmail.com'
    },
    {
        'name': 'Hong Hanh Chu',
        'userName': 'Chu',
        'pic': './img/avatarHongHanh.jpg',
        'password': 'honghanhspassword',
        'email': 'hong.hanh.chu@gmail.com'
    },
    {
        'name': 'Tim Kuntze',
        'userName': 'Kuntze',
        'pic': './img/TimKuntze.jpg',
        'password': 'timkuntzepassword',
        'email': 'tim.kuntze@gmail.com'
    }
];

function login() {
    let userNameKey = u => u.userName === document.getElementById('userName').value;
    let userPasswordKey = u => u.password === document.getElementById('userPassword').value;
    let userValidator = users.filter(userNameKey).filter(userPasswordKey);

    if (userValidator.length == 0) {
        document.getElementById('exclamationMark').classList.remove('transparent');
        document.getElementById('alert').classList.remove('transparent');
    } else {
        location.replace('./dashboard.html');
        document.getElementById('exclamationMark').classList.add('transparent');
        document.getElementById('alert').classList.add('transparent');
    }

}

var enterEventPassword = document.getElementById("userPassword");

enterEventPassword.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("loginBtn").click();
    }
});

var enterEventUser = document.getElementById("userName");

enterEventUser.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("loginBtn").click();
    }
});