const { pool } = require("../database/config/config");

const centroApi = {
    getAllCentros : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Centro_vacunacion`);
        const centros = results.rows;
        res.json({
            data : centros,
            msg : ""
        })
    },

    getCentro: async(req, res) => {
        let { id } = req.body;
        const results = await pool.query(`SELECT * FROM Centro_vacunacion WHERE ID_centro =$1`, [id]);
        const centro = results.rows[0];
        res.json({
            data : centro,
            msg : ""
        })
    }
}

module.exports = centroApi;