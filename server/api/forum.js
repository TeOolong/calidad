const { pool } = require("../database/config/config");

const forumApi = {
    getAllPosts : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Forum`);
        const posts = results.rows;
        res.json({
            data : posts,
            msg : ""
        })
    },
    insertPost : async(req, res) => {
        let { dni,post  } = req.body;
        var dia = new Date()
        var num = new Date().getTime()-(Math.floor((new Date().getTime()/100000000))*100000000);
        console.log(num, dni, post, dia.toISOString().slice(0, 10))
        pool.query(`INSERT INTO Forum (ID_forum, ClienteForum , Publicacion, Fecha) VALUES($1,$2,$3,$4)`, [num, dni, post, dia.toISOString().slice(0, 10)]);
        res.json({
            msg : ""
        })   
    }

}

module.exports = forumApi;