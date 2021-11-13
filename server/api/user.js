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
            else {
                const results = await pool.query(`SELECT * FROM Cliente WHERE DNICli =$1`, [dni]);
                if(results.rows.length > 0){
                    const user = results.rows[0];
                    
                    const isValid = await bcrypt.compare(password, user.password);
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
        if(objRes.msg==""){
            req.session.isAuth = true;
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
            const backData = await fetch(`https://apiperu.dev/api/dni/${dni}`,{
            method : 'GET',
            headers: {
                'Authorization': 'Bearer ce7a7d75d349276aa88481ea03867c2d3da2efade5d68fa09290bc6ed4000769',
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
                    if(verification!=data.data.codigo_verificacion) {
                        objRes = {
                            msg : "Codigo de verificación invalido"
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
                                [dni,data.data.nombres,data.data.apellido_paterno, data.data.apellido_materno, dni,hashedPassword,data.data.direccion_completa,dateRef.toISOString().slice(0, 10),verification, 0 ]); 
                                
                            objRes = {
                                msg : ""
                            } 
                        }
                    } 
                }
            }
        }
        res.json(objRes);
    }
        
}

module.exports = userApi;