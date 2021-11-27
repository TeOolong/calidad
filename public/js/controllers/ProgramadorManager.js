class ProgramadorManager {
    static instance;
    constructor() {
        if(!!ProgramadorManager.instance) {
            return ProgramadorManager.instance;
        }
        ProgramadorManager.instance = this;
        
    }



    async insertarCita (dni, fecha, ubicacion, vacuna) {
        const dataJSON = {
            "dni": dni,
            "fecha": fecha,
            "ubicacion": ubicacion,
            "vacuna": vacuna
        };
    
        const resp = await fetch(`${URL_BASE}/insert`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        return data.msg;
    }

    async actualizarCita (dni, fecha, ubicacion, vacuna) {
        const dataJSON = {
            "dni": dni,
            "fecha": fecha,
            "ubicacion": ubicacion,
            "vacuna": vacuna
        };
    
        const resp = await fetch(`${URL_BASE}/update`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        return data.msg;
    }
    async actualizarDosis(dni, dosis) {
        const dataJSON = {
            "dni": dni,
            "dosis": dosis
        };
    
        const resp = await fetch(`${URL_BASE}/dosis`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        return data.msg
    }
    
}
