const dropArea = document.querySelector(".drag__container");
const text = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector(".input-file");
let files;
button.addEventListener('click', e => {
    input.click()
})

input.addEventListener("change", (e) => {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
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

function processFile(file){
    const docType = file.type;
    const validExtension = ['application/pdf'];
    if(validExtension.includes(docType)){
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;
        
    }else{
        alert("No es archivo valido")
    }
}