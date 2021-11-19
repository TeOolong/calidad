class NoticiaManager {
    static instance;
    constructor() {
        if(!!NoticiaManager.instance) {
            return NoticeManager.instance;
        }
        NoticiaManager.instance = this;
        
    }

    async obtenerNoticias () {
        var listaNoticias = [];
        const resp = await fetch(`${URL_BASE}/news`,{method : "GET"});
        const data = await resp.json();
        for (var noticia of data.data) {
            var noticiaRef = new Noticia(noticia.id_noticia, noticia.imgnot, noticia.textonot);
            listaNoticias.push(noticiaRef);
        }
        return listaNoticias;
    }

    
}

