class HistorialClinicoManager {
    static instance;
    constructor() {
        if(!!HistorialClinicoManager.instance) {
            return HistorialClinicoManager.instance;
        }
        HistorialClinicoManager.instance = this;
        
    }

    async obtenerHistorialClinico (dni) {
        const dataJSON = {
            "dni": dni
        };
    
        const resp = await fetch(`${URL_BASE}/historial`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        

        if(data.msg!=""){
            return null
        }
        else {
            var historial = data.data;
            var historialRef = new HistorialClinico(historial.id_historial, historial.clienteid, historial.file)
            return historialRef;
            
        }
        
    }  
    async insertarHistorialClinico (dni,dataFile) {
        const dataJSON = {
            "dni":dni,
            "file": dataFile
        };
    
        const resp = await fetch(`${URL_BASE}/newhistorial`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        return data.msg;

        
    }   
}