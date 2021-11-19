class CitaManager {
    static instance;
    constructor() {
        if(!!CitaManager.instance) {
            return CitaManager.instance;
        }
        CitaManager.instance = this;
        
    }

    async obtenerCitas () {
        var listaCitas = [];
        const resp = await fetch(`${URL_BASE}/citas`,{method : "GET"});
        const data = await resp.json();
        for (var cita of data.data) {
            var citaRef = new Cita(cita.id_cita, cita_clientecita, cita.centrocita, cita.vacunacita, cita.fecha_vacunacion, cita.estadocita);
            listaCitas.push(citaRef);
        }
        return listaCitas;
    }

    async obtenerCita (iduser) {
        const dataJSON = {
            "id": iduser
        };
    
        const resp = await fetch(`${URL_BASE}/cita`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});

            

        const data = await resp.json();
        console.log(data)
        if(data.msg!=""){
            return null
        }
        else {
            var cita = data.data;
            var citaRef = new Cita(cita.id_cita, cita.clientecita, cita.centrocita, cita.vacunacita, cita.fecha_vacunacion, cita.estadocita);
            return citaRef;
            
        }
        
    }

    
}
