class MedicoManager {
    static instance;
    constructor() {
        if(!!MedicoManager.instance) {
            return MedicoManager.instance;
        }
        MedicoManager.instance = this;
        
    }

    async obtenerMedicos () {
        var listaMedicos = [];
        const resp = await fetch(`${URL_BASE}/medicos`,{method : "GET"});
        const data = await resp.json();
        for (var medico of data.data) {
            var medicoRef = new Medico(medico.id_medico,medico.nombre,medico.apellido,medico.especialidad,medico.foto_perfil);
            listaMedicos.push(medicoRef);
        }
        return listaMedicos;
    }

    async obtenerMedico (id) {
        const dataJSON = {
            "id": id
        };
    
        const resp = await fetch(`${URL_BASE}/medico`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        var medico = data.data;
        var medicoRef = new Medico(medico.id_medico,medico.nombre,medico.apellido,medico.especialidad,medico.foto_perfil)
        return medicoRef;
    }

    
}
