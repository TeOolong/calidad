class CentroVacunacionManager {
    static instance;
    constructor() {
        if(!!CentroVacunacionManager.instance) {
            return CentroVacunacionManager.instance;
        }
        CentroVacunacionManager.instance = this;
        
    }

    async obtenerCentrosDeVacunacion () {
        var listaCentrosVacunacion = [];
        const resp = await fetch(`${URL_BASE}/centros`,{method : "GET"});
        const data = await resp.json();
        for (var centro of data.data) {
            var centroRef = new CentroVacunacion(centro.id_centro, centro.nombrecentro,
                centro.direccioncentro,centro.horariocentro);
            listaCentrosVacunacion.push(centroRef);
        }
        console.log(listaCentrosVacunacion)
        return listaCentrosVacunacion;

    }

    async obtenerCentroDeVacunacion (id) {
        const dataJSON = {
            "id": id
        };
    
        const resp = await fetch(`${URL_BASE}/centro`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        var centro = data.data;
        var centroRef = new CentroVacunacion(centro.id_centro, centro.nombrecentro,
            centro.direccioncentro,centro.horariocentro);
        return centroRef;
    }

    
}
