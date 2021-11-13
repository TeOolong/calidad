const { pool } = require("../database/config/config");

const comentApi = {
    getAllComents : async(req, res) => {
        const results = await pool.query(`SELECT * FROM ComentarioMedico`);
        const comentarios = results.rows;
        res.json({
            data : comentarios,
            msg : ""
        })
    },

}

module.exports = comentApi;