const URL_BASE = 'http://localhost:3000';

var UM = new UsuarioManager();

const calcularAños = (fechaNacimiento) => {
    var today = new Date();
    //Restamos los años
    var años = today.getFullYear() - fechaNacimiento.getFullYear();
    // Si no ha llegado su cumpleaños le restamos el año por cumplir
    if (fechaNacimiento.getMonth() > (today.getMonth()) || fechaNacimiento.getDay() > today.getDay())
        años--;
    return años;
}


const mostrarUsuario = async() => {
    const user = await UM.obtenerUsuarioEnSesion();
    //Creacion de divs
    var left_container = document.querySelector(".left__container");
    var info_data = document.querySelector(".info__data");
    //Creacion de divs centrales
    var data_nombre = document.createElement('div');
    data_nombre.setAttribute('class', 'data')
    var data_edad = document.createElement('div');
    data_edad.setAttribute('class', 'data')
    var data_dosis = document.createElement('div');
    data_dosis.setAttribute('class', 'data')
    var data_direccion = document.createElement('div');
    data_direccion.setAttribute('class', 'data')
    //Creacion de componentes
    var nombre_slang = document.createElement('h5');
    nombre_slang.innerHTML = "Nombre completo";
    var edad_slang = document.createElement('h5');
    edad_slang.innerHTML = "Edad"
    var direccion_slang = document.createElement('h5');
    direccion_slang.innerHTML = "Dirección"
    var dosis_slang = document.createElement('h5');
    dosis_slang.innerHTML = "Dosis"
    //Creacion de componentes-datos
    var nombre = document.createElement('p');
    nombre.innerHTML = `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`;
    var edad = document.createElement('p');
    edad.innerHTML = `${calcularAños(new Date(user.nacimiento))} años`;
    var dosis = document.createElement('p');
    dosis.innerHTML = user.dosis;
    var direccion = document.createElement('p');
    direccion.innerHTML = user.direccion;
    //Combinación de componentes con datos
    data_nombre.appendChild(nombre_slang);
    data_direccion.appendChild(direccion_slang);
    data_edad.appendChild(edad_slang);
    data_dosis.appendChild(dosis_slang);
    
    data_nombre.appendChild(nombre);
    data_direccion.appendChild(direccion);
    data_edad.appendChild(edad);
    data_dosis.appendChild(dosis);
    

    info_data.appendChild(data_nombre);
    info_data.appendChild(data_direccion);
    info_data.appendChild(data_edad);
    info_data.appendChild(data_dosis);
    


}

const main = () => {
    mostrarUsuario();
    mostrarUsuario
}

window.onload = main;