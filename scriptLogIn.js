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
        document.getElementById('exclamationMark').classList.remove('dHide');
        document.getElementById('alert').classList.remove('dHide');
    } else {
        redirect();
        document.getElementById('exclamationMark').classList.add('dHide');
        document.getElementById('alert').classList.add('dHide');
    }

    lsRememberMe();

}

function redirect() {
    location.href = './dashboard.html';
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

const rmCheck = document.getElementById("rememberMe");
const rmUser = document.getElementById("userName");


if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    rmUser.value = localStorage.username;

    let userNameKey = u => u.userName === localStorage.username;
    let temp = users.filter(userNameKey);

    document.getElementById('loginIcon').src = temp[0].pic;
    console.log(temp[0].pic);
} else {
    rmCheck.removeAttribute("checked");
    rmUser.value = "";
}

function lsRememberMe() {
    if (rmCheck.checked && rmUser.value !== "") {
        localStorage.username = rmUser.value;
        localStorage.checkbox = rmCheck.value;
    } else {
        localStorage.username = "";
        localStorage.checkbox = "";
    }
}