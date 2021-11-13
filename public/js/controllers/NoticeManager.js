class NoticeManager {
    static instance;
    constructor() {
        if(!!NoticeManager.instance) {
            return NoticeManager.instance;
        }
        NoticeManager.instance = this;
        
    }

    async obtenerNoticias () {
        var listaNoticias = [];
        const resp = await fetch(`${URL_BASE}/notices`,{method : "GET"});
        const data = await resp.json();
        for (var notice of data.data) {
            var noticeRef = new Notice(notice.id_noticia, notice.imgnot, notice.textonot);
            listaNoticias.push(noticeRef);
        }
        return listaNoticias;
    }

    
}

