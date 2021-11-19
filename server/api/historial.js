const { pool } = require("../database/config/config");

const historialApi = {
    getHistorialByUser : async(req, res) => {
        let { dni } = req.body;
        const results = await pool.query(`SELECT * FROM HistorialClinico WHERE ClienteID =$1`, [dni]);
        const historial = results.rows[0];
        if(historial!=null) {
            res.json({
                data : historial,
                msg : ""
            })
        }
        else{
            res.json({
                msg : "no-data"
            })
        }
    },
      insertHistorial : async(req,res) => {
        let { dni,file } = req.body;
        console.log(file)
        const doExist = await pool.query(`SELECT * FROM HistorialClinico WHERE ClienteID=$1`,[dni]);
        if (doExist.rows.length > 0){
            pool.query(`DELETE FROM HistorialClinico WHERE ClienteID=$1`,[dni])
        }
        var num = new Date().getTime()-(Math.floor((new Date().getTime()/100000000))*100000000)
        pool.query(`INSERT INTO HistorialClinico (ID_Historial, ClienteID, File) VALUES($1,$2,$3)`, [num, dni, file]);
        res.json({
            msg : ""
        })              
        
    },
   


}

module.exports = historialApi;