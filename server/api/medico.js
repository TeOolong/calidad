const { pool } = require("../database/config/config");

const medicoApi = {
    getAllMedicos : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Medico`);
        const medicos = results.rows;
        res.json({
            data : medicos,
            msg : ""
        })
    },

    getMedico : async(req, res) => {
        let { id } = req.body;
        const results = await pool.query(`SELECT * FROM Medico WHERE ID_Medico =$1`, [id]);
        const medicos = results.rows[0];
        res.json({
            data : medicos,
            msg : ""
        })
    }
}

module.exports = medicoApi;