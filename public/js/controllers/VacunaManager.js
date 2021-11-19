class VacunaManager {
    static instance;
    constructor() {
        if(!!VacunaManager.instance) {
            return VacunaManager.instance;
        }
        VacunaManager.instance = this;
        
    }

    async obtenerVacunas () {
        var listaVacunas = [];
        const resp = await fetch(`${URL_BASE}/vacunas`,{method : "GET"});
        const data = await resp.json();
        for (var vacuna of data.data) {
            var vacunaRef = new Vacuna(vacuna.id_vacuna, vacuna.nombrevac, vacuna.cantidadvac);
            listaVacunas.push(vacunaRef);
        }
        return listaVacunas;
    }

    async obtenerVacuna (id) {
        const dataJSON = {
            "id": id
        };
    
        const resp = await fetch(`${URL_BASE}/vacuna`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        var vacuna = data.data;
        var vacunaRef = new Vacuna(vacuna.id_vacuna, vacuna.nombrevac, vacuna.cantidadvac);
        return vacunaRef;
    }
    
}
