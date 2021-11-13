const { pool } = require("../database/config/config");

const noticeApi = {
    getAllNotices : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Noticia`);
        const notices = results.rows;
        res.json({
            data : notices,
            msg : ""
        })
    }
}

module.exports = noticeApi;