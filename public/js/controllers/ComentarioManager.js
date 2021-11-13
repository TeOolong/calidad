class ComentarioManager {
    static instance;
    constructor() {
        if(!!ComentarioManager.instance) {
            return ComentarioManager.instance;
        }
        ComentarioManager.instance = this;
        
    }

    async obtenerComentarios () {
        var listaComentarios = [];
        const resp = await fetch(`${URL_BASE}/comentarios `,{method : "GET"});
        const data = await resp.json();
        for (var coment of data.data) {
            var comentRef = new Comentario(coment.id_comentario, coment.textocoment, coment.medicoid);
            listaComentarios.push(comentRef);
        }
        return listaComentarios;
    }

    
}