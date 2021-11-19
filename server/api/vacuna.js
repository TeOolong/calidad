const { pool } = require("../database/config/config");

const vacunaApi = {
    getAllVacunas : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Vacuna`);
        const vacunas = results.rows;
        res.json({
            data : vacunas,
            msg : ""
        })
    },

    getVacuna : async(req, res) => {
        let { id } = req.body;
        const results = await pool.query(`SELECT * FROM Vacuna WHERE ID_vacuna =$1`, [id]);
        const vacuna = results.rows[0];
        res.json({
            data : vacuna,
            msg : ""
        })
    }
}

module.exports = vacunaApi;