
var forms_container = document.querySelector(".forms__container");
var form_login = document.querySelector(".forms__container-login");
var form_register = document.querySelector(".forms__container-register");
var info_login = document.querySelector(".information__container-login");
var info_register = document.querySelector(".information__container-register");
const register = () => {
    form_register.style.display = "block";
    forms_container.style.left = "410px";
    form_login.style.display = "none";
    info_register.style.opacity = "0";
    info_login.style.opacity = "1";
}

const login = () => {
    form_login.style.display = "block";
    forms_container.style.left = "10px";
    form_register.style.display = "none";
    info_login.style.opacity = "0";
    info_register.style.opacity = "1";
}

document.getElementById("switch_register").addEventListener("click", register);
document.getElementById("switch_login").addEventListener("click", login);



