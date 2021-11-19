const URL_BASE = 'http://localhost:3000';
const dropArea = document.querySelector(".drag__container");
const text = dropArea.querySelector("h2");
const buttonDrag = dropArea.querySelector("button");
const input = dropArea.querySelector(".input-file");
var UM = new UsuarioManager();
var HCM = new HistorialClinicoManager();
let files;

buttonDrag.addEventListener('click', e => {
    input.click()
})

input.addEventListener("change", (e) => {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
    input.value="";
    dropArea.classList.remove("active")
})

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    text.textContent = "Suelta para subir el historial clínico"

});
dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    text.textContent = "Arrastra y suelta tu historial clínico"
});
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    text.textContent = "Suelta para subir el historial clínico"

});


function showFiles(files) {
    if(files.length ===undefined){
        processFile(files)
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}

const processFile = (file) =>{
    const docType = file.type;
    const validExtension = ['text/plain'];
    if(validExtension.includes(docType)){
        const fileReader = new FileReader();
        fileReader.onload = async() => {
            const user = await UM.obtenerUsuarioEnSesion();
            HCM.insertarHistorialClinico(user.id,fileReader.result);
            procesarHistorial();
        }
        fileReader.readAsText(file)
        
        
    }else{
        console.log(docType)
        alert("No es archivo valido")
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
    var nombre_slang = document.createElement('h5');
    nombre_slang.innerHTML = "Nombre completo";
    var edad_slang = document.createElement('h5');
    edad_slang.innerHTML = "Edad"
    //Creacion de componentes-datos-left
    var data_usuario = document.createElement('h4')
    data_usuario.innerHTML = user.nombre;
    var data_dni = document.createElement('p')
    data_dni.innerHTML = user.dni
    //Creacion de componentes-datos-right
    var nombre = document.createElement('p');
    nombre.innerHTML = `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`;
    var edad = document.createElement('p');
    edad.innerHTML = `${calcularAños(new Date(user.nacimiento))} años`;
    //Combinación de componentes con datos
    data_nombre.appendChild(nombre_slang);
    data_edad.appendChild(edad_slang);
    
    data_nombre.appendChild(nombre);
    data_edad.appendChild(edad);

    info_data.appendChild(data_nombre);
    info_data.appendChild(data_edad);

    left_container.appendChild(data_usuario);
    left_container.appendChild(data_dni);
}

const procesarHistorial = async() => {
    var lista_enfermedades = document.getElementById("enfermedades");
    while( lista_enfermedades.firstChild ){
        lista_enfermedades.removeChild( lista_enfermedades.firstChild );
      }
    var lista_medicamentos = document.getElementById("medicamentos");
    while( lista_medicamentos.firstChild ){
        lista_medicamentos.removeChild( lista_medicamentos.firstChild );
      }    
    const user = await UM.obtenerUsuarioEnSesion();
    const historial = await HCM.obtenerHistorialClinico(user.id)
    if(historial!=null){
        
        
        var raw_data = historial.file.split('\n').map((data)=>{
            return data.replace("\r", "").replace("-", "")
        })
        var enfermedades = raw_data.slice(raw_data.indexOf("Enfermedades")+1,raw_data.indexOf("Medicamentos")-1)
        var medicamentos = raw_data.slice(raw_data.indexOf("Medicamentos")+1,raw_data.length-1);
        for(enfermedad in enfermedades){
            var elemento = document.createElement('li');
            
            elemento.innerHTML = enfermedades[enfermedad];
            lista_enfermedades.appendChild(elemento)
        }
        for(medicamento in medicamentos){
            var elemento = document.createElement('li');
            elemento.innerHTML = medicamentos[medicamento];
            lista_medicamentos.appendChild(elemento)
        }
    }else{
        var elemento = document.createElement('li');
        elemento.innerHTML = "No hay data en el historial clínico";
        lista_enfermedades.appendChild(elemento)
        var elemento = document.createElement('li');
        elemento.innerHTML = "No hay data en el historial clínico";
        lista_medicamentos.appendChild(elemento)    
    }
    
     
}

const main = async() => {
    mostrarUsuario();
    procesarHistorial();
}
window.onload = main;