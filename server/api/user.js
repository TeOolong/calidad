const userApi = {
    login : async(req, res) => {
        let { dni, password} = req.body;
        let objRes;
        if(dni=="" || dni==""){
            objRes = {
                msg : "Debes llenar todos los campos"
            }
        }
        else{
            if(dni.length() !=8) 
            objRes = {
                msg : "Presentar un número de DNI valido"
            }
            else {
                objRes = {
                    msg : ""
                }
            }
        }
        console.log({
            dni, password
        }) 
        
    },
    register : async(req, res) => {
        let { dni,nombre,paterno,materno,password,verification} = req.body;
        console.log({
            dni,nombre,paterno,materno,password,verification
        })
    }
}

module.exports = userApi;