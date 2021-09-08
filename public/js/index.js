const URL_BASE = 'http://localhost:3000';
var forms_container = document.querySelector(".forms__container");
var form_login = document.querySelector(".forms__container-login");
var form_register = document.querySelector(".forms__container-register");
var info_login = document.querySelector(".information__container-login");
var info_register = document.querySelector(".information__container-register");

const login = async(event) => {
    event.preventDefault();
    let form = document.forms["login_form"];
    let dni = form.dni.value;
    let password = form.password.value;
    const data = {
        "dni": dni,
        "password": password
    };
    const resp = await fetch(`${URL_BASE}/login`,{
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)});
    
}

const register = async(event) => {
    event.preventDefault();
    let form = document.forms["register_form"];
    let dni = form.dni.value;
    let nombre = form.nombre.value;
    let paterno = form.paterno.value;
    let materno = form.materno.value;
    let password = form.password.value;
    let verification = form.verification.value;

    const data = {
        "dni": dni,
        "nombre": nombre,
        "paterno": paterno,
        "materno": materno,
        "password": password,
        "verification": verification
    };

    const resp = await fetch(`${URL_BASE}/register`,{
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)});
}

const switch_register = () => {
    form_register.style.display = "block";
    forms_container.style.left = "410px";
    form_login.style.display = "none";
    info_register.style.opacity = "0";
    info_login.style.opacity = "1";
}

const switch_login = () => {
    form_login.style.display = "block";
    forms_container.style.left = "10px";
    form_register.style.display = "none";
    info_login.style.opacity = "0";
    info_register.style.opacity = "1";
}
document.getElementById("register").addEventListener("click", register);
document.getElementById("login").addEventListener("click", login);

document.getElementById("switch_register").addEventListener("click", switch_register);
document.getElementById("switch_login").addEventListener("click", switch_login);



