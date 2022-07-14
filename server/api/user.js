const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const { pool } = require("../database/config/config");
const session = require('express-session');
const dateRef = new Date('December 17, 1995 03:24:00');
const userApi = {
    login : async(req, res) => {
        let { dni, password} = req.body;
        let objRes;
        if(dni.length==0 || password.length==0){
            objRes = {
                msg : "Debes llenar todos los campos"
            }
        }
        else{
            if(dni.length !=8) 
            objRes = {
                msg : "Presentar un número de DNI valido"
            }
            else{
                if(dni.length !=8) 
                objRes = {
                    msg : "Presentar un número de DNI valido"
                }
                else {
                    const results = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`, [dni]);
                    if(results.rows.length > 0){
                        const user = results.rows[0];
                        const isValid = await bcrypt.compare(password, user.contraseñacli);
                        if(isValid){
                            objRes = {
                                msg : ""
                            }
                        }
                        else{
                            objRes = {
                                msg : "Contraseña es incorrecta"
                            }
                        }
                    }
                    else {
                        objRes = {
                            msg : "Usuario no registrado"
                        }
                    }
                    
                }
            }
        }
        if(objRes.msg==""){
            req.session.isAuth = true;
            req.session.userId = dni;
            req.session.isProgrammer = false;
            req.session.isClient = true;
        }
        res.json(objRes);
        


    },
    register : async(req, res) => {
        
        let { dni,password,repassword,verification} = req.body;
        let objRes;
        
        if(dni.length==0 || password.length==0  ){
            objRes = {
                msg : "Debes llenar todos los campos"
            }
        }
        else {
            if(dni.length ==8) {
                const backData = await fetch(`https://apiperu.dev/api/dni/${dni}?api_token=15a344180d5a35e47f836e7d1d6bdab47a9103a8810d7af549b8bc74feabff81`,{
                method : 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    }
                });
                const data = await backData.json();
                
                
                if (data.success != true){
                    objRes = {
                        msg : "Error de contacto con servidor"
                    }
                }
                else {
                    if(password!=repassword){
                        objRes = {
                            msg : "Contraseñas no coinciden"
                        }
                    }
                    else {
                        let hashedPassword = await bcrypt.hash(password, 10);
                            const doExist = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`,[dni]);
                            if (doExist.rows.length > 0) {
                                objRes = {
                                    msg : "Usuario ya ha sido registrado"
                                }
                            }
                            else {
                                pool.query(
                                    `INSERT INTO Cliente (ID_Cliente, NombreCli, ApePCli,ApeMCli, DNICli, contraseñaCLI, Direccion, FechaNacCli, CdoVrfCli, Dosis) 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10)`, 
                                    [dni,data.data.nombres,data.data.apellido_paterno, data.data.apellido_materno, dni,hashedPassword,"Jiron Jose Nicolás Rodrigo 166",dateRef.toISOString().slice(0, 10),verification, 0 ]); 
                                    
                                objRes = {
                                    msg : ""
                                } 
                            }
                    }
                }
            }
            else {
                objRes = {
                    msg : "Presentar un número de DNI valido"
                }
            }
        }
        res.json(objRes);
    },

    getUserInSession : async(req, res) => {
        const results = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`, [req.session.userId]);
        const user = results.rows[0];
        res.json({
            data : user,
            msg : ""
        })
    },
    getUser : async(req, res) => {
        let { dni} = req.body;
        const results = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`, [dni]);
        const user = results.rows[0];
        res.json({
            data : user,
            msg : ""
        })
    },
    loginProgramador : async(req, res) => {
        let { username, password} = req.body;
        let objRes;
        if(username.length==0 || password.length==0){
            objRes = {
                msg : "Debes llenar todos los campos"
            }
        }
        else{
            const results = await pool.query(`SELECT * FROM Programador WHERE username=$1`, [username]);
            if(results.rows.length > 0){
                const user = results.rows[0];
                if(password == user.password){
                    objRes = {
                        msg : ""
                    }
                }
                else {
                    objRes = {
                        msg : "Contraseña es incorrecta"
                    }
                }
            }
            else{
                objRes = {
                    msg : "Usuario no registrado"
                }
            }
        }
        if(objRes.msg==""){
            req.session.isAuth = true;
            req.session.userId = username;
            req.session.isProgrammer = true;
            req.session.isClient = false;
            
        }
        res.json(objRes);
    },
    endSession: async(req,res) => {
        req.session.isAuth = false;
        req.session.isClient = false;
        req.session.isProgrammer = false;
        res.json({
            msg : ""
        });
    },
    actualizarDosisVacuna : async(req,res) => {
        let { dni, dosis } = req.body;
        if(dni.length == 0){
            res.json({
                msg : "Cliente no existe"
            })
        }else {
            const doExist = await pool.query(`SELECT * FROM Cliente WHERE ID_Cliente =$1`,[dni]);
            if (!(doExist.rows.length > 0)){
                res.json({
                    msg : "Cliente no existe"
                })
            }else{
                var query = `UPDATE Cliente SET Dosis='${dosis}' WHERE ID_Cliente=${dni}`
                console.log(query)
                await pool.query(query);
                res.json({
                    msg : ""
                })
            }
            
        }
        
        
    }
        
}

module.exports = userApi;