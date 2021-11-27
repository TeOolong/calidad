class UsuarioManager {
    static instance;
    constructor() {
        if(!!UsuarioManager.instance) {
            return UsuarioManager.instance;
        }
        UsuarioManager.instance = this;
        
    }
    

    async obtenerUsuarioEnSesion () {
        const resp = await fetch(`${URL_BASE}/actualuser`,{method : "GET"});
        const data = await resp.json();
        const user = data.data;
        const userRef = new Usuario(
            user.id_cliente,user.nombrecli, user.apepcli,user.apemcli, 
            user.dnicli, user.direccion, user.fechanaccli,user.dosis);
        return userRef;

    }
    async obtenerUsuario (dni) {
        const dataJSON = {
            "dni": dni
        };
    
        const resp = await fetch(`${URL_BASE}/user`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataJSON)});
        const data = await resp.json();
        const user = data.data;
        const userRef = new Usuario(
            user.id_cliente,user.nombrecli, user.apepcli,user.apemcli, 
            user.dnicli, user.direccion, user.fechanaccli,user.dosis);
        return userRef;

    }    
}

