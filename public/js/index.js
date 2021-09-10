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
    const log = await resp.json();
    console.log(log.msg)
    if(log.msg == ""){
        console.log("todo gucci");
        document.getElementById("alert_login").style.display = "none"
        document.getElementById("alert_login").style.opacity = "0";
    }
    else{
        document.getElementById("alert_login").innerHTML = log.msg;
        document.getElementById("alert_login").style.display = "block"
        document.getElementById("alert_login").style.opacity = "1";
    }
    
}

const register = async(event) => {
    event.preventDefault();
    let form = document.forms["register_form"];
    let dni = form.dni.value;
    let password = form.password.value;
    let repassword = form.repassword.value;
    let verification = form.verification.value;
    
    const data = {
        "dni": dni,
        "password": password,
        "repassword": repassword,
        "verification": verification
    };

    const resp = await fetch(`${URL_BASE}/register`,{
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)});
    const log = await resp.json();
    if(log.msg == ""){
        console.log("todo gucci"); 
        switch_login();

    }
    else{
        document.getElementById("alert_register").innerHTML = log.msg;
        document.getElementById("alert_register").style.display = "block"
        document.getElementById("alert_register").style.opacity = "1";
    }
}

const switch_register = () => {
    form_register.style.display = "block";
    forms_container.style.left = "410px";
    form_login.style.display = "none";
    info_register.style.opacity = "0";
    info_login.style.opacity = "1";

    document.getElementById("alert_login").style.display = "none"
    document.getElementById("alert_login").style.opacity = "0";

    let form = document.forms["login_form"];
    form.dni.value ="";
    form.password.value ="";
}

const switch_login = () => {
    form_login.style.display = "block";
    forms_container.style.left = "10px";
    form_register.style.display = "none";
    info_login.style.opacity = "0";
    info_register.style.opacity = "1";

    document.getElementById("alert_register").style.display = "none"
    document.getElementById("alert_register").style.opacity = "0";

    let form = document.forms["register_form"];
    form.dni.value ="";
    form.password.value ="";
    form.repassword.value="";
    form.verification.value="";
}
document.getElementById("register").addEventListener("click", register);
document.getElementById("login").addEventListener("click", login);

document.getElementById("switch_register").addEventListener("click", switch_register);
document.getElementById("switch_login").addEventListener("click", switch_login);

document.getElementById("alert_login").style.display = "none"
document.getElementById("alert_login").style.opacity = "0";
document.getElementById("alert_register").style.display = "none"
document.getElementById("alert_register").style.opacity = "0";



