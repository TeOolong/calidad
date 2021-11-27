const URL_BASE = 'http://localhost:3000';

var UM = new UsuarioManager();
var VM = new VacunaManager();
var CVM = new CentroVacunacionManager();
var CM = new CitaManager();
var date;
var dateRef;
const cargarDia = async() => {
    const user = await UM.obtenerUsuarioEnSesion();
    const cita = await CM.obtenerCita(user.id);
    date = new Date();
    dateRef = new Date();
    if(cita!=null){
        date = new Date(cita.fecha_vacunacion)
        dateRef = new Date(cita.fecha_vacunacion)
    }
}


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
    //Creacion de componentes-right
    var nombre_slang = document.createElement('h5');
    nombre_slang.innerHTML = "Nombre completo";
    var edad_slang = document.createElement('h5');
    edad_slang.innerHTML = "Edad"
    var direccion_slang = document.createElement('h5');
    direccion_slang.innerHTML = "Dirección"
    var dosis_slang = document.createElement('h5');
    dosis_slang.innerHTML = "Dosis"
    //Creacion de componentes-datos-left
    var data_usuario = document.createElement('h4')
    data_usuario.innerHTML = user.nombre;
    var data_dni = document.createElement('p')
    data_dni.innerHTML = user.dni
    var button = document.createElement('button')
    button.setAttribute('onclick', "window.location.href='/historial'")
    button.innerHTML = 'Historial clínico'
    //Creacion de componentes-datos-right
    var nombre = document.createElement('p');
    nombre.innerHTML = `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`;
    var edad = document.createElement('p');
    edad.innerHTML = `${calcularAños(new Date(user.nacimiento))} años`;
    var dosis = document.createElement('p');
    if(user.dosis=='0'){
        dosis.innerHTML =  'Primera dosis'
    }
    else{
        dosis.innerHTML = 'Segunda dosis'
    } 
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

    left_container.appendChild(data_usuario);
    left_container.appendChild(data_dni);
    left_container.appendChild(button);
}

const obtenerDatosVacuna = async() => {
    const user = await UM.obtenerUsuarioEnSesion();
    const cita = await CM.obtenerCita(user.id);
    console.log(cita)
    var vacunation_data = document.querySelector(".vacunation__data");
    if(cita!=null){
        const centroVacunacion = await CVM.obtenerCentroDeVacunacion(cita.id_centro);
        const vacuna = await VM.obtenerVacuna(cita.id_vacuna);
        var data_lugar = document.createElement('div');
        data_lugar.setAttribute('class', 'data');
        var data_vacuna = document.createElement('div');
        data_vacuna.setAttribute('class', 'data');

        var lugar_slang = document.createElement('h5');
        lugar_slang.innerHTML = "Lugar"
        var vacuna_slang = document.createElement('h5');
        vacuna_slang.innerHTML = "Vacuna"

        var lugar_data = document.createElement('p');
        lugar_data.innerHTML = centroVacunacion.nombre;
        var vacuna_data = document.createElement('p');
        vacuna_data.innerHTML = vacuna.nombre

        data_lugar.appendChild(lugar_slang);
        data_lugar.appendChild(lugar_data);

        data_vacuna.appendChild(vacuna_slang);
        data_vacuna.appendChild(vacuna_data);

        vacunation_data.appendChild(data_lugar);
        vacunation_data.appendChild(data_vacuna);
    }else{
        
        var data_info = document.createElement('div');
        data_info.setAttribute('class', 'data');
        var info = document.createElement('h5');
        info.innerHTML = "No hay cita programada para este usuario";
        data_info.appendChild(info);
        vacunation_data.appendChild(data_info);
    }
}


const renderCalendar = async() => {
    
    const months = [ "Enero", "Febrero" , "Marzo" , "Abril" ,"Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre" ,"Diciembre" ];
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const monthDays = document.querySelector('.calendar__days');
    const lastDay = new Date(dateRef.getFullYear(), dateRef.getMonth()+1, 0).getDate();
    const prevLastDay = new Date(dateRef.getFullYear(), dateRef.getMonth(), 0).getDate();
    const firstDayIndex = dateRef.getDay();
    const lastDayIndex = new Date(dateRef.getFullYear(), dateRef.getMonth()+1, 0).getDay();
    const nextDays = 7 - lastDayIndex -1;
    document.querySelector('.calendar__date h1').innerHTML = months[dateRef.getMonth()];
    document.querySelector('.calendar__date p').innerHTML = dateRef.toLocaleDateString("es-ES", options)
    
    let days = "";
    
    for(let i = firstDayIndex; i>0; i--){
        days += `<div class="prev-date">${prevLastDay-i+1}</div>`;
        monthDays.innerHTML = days;
    }
    
    for(let i = 1; i<=lastDay;i++){
        
        if(i== date.getDate() && dateRef.getMonth() == date.getMonth()){
            days += `<div class="today">${i}</div>`;
        }else{
            days += `<div>${i}</div>`;
        }
        
        monthDays.innerHTML = days;
    }
    
    for(let i = 1; i<=nextDays;i++){
        days += `<div class="next-date">${i}</div>`;
        monthDays.innerHTML = days;
    }
    
}

document.querySelector(".prev").addEventListener("click", async() => {
    dateRef.setMonth(dateRef.getMonth() - 1);
    renderCalendar();
  });
  
  document.querySelector(".next").addEventListener("click", async() => {
    
    dateRef.setMonth(dateRef.getMonth() + 1);
    renderCalendar();
  });


const main = async() => {
    await cargarDia();
    mostrarUsuario();
    obtenerDatosVacuna();
    renderCalendar();
}

window.onload = main;