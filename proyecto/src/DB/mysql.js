const mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/respuestas');

const dbconfig = {
    host:config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql,200);
        }else{
            console.log('DB CONECTADA !!!')
        }
    });

    conexion.on('error',err=>{
        console.log('[db err]', err);
        if(err.code=='PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function todos(tabla){
    return new Promise ((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function porcategoria(tabla, categoria){
    return new Promise ((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE categoria=${categoria}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function uno(tabla, id){
    return new Promise ((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ID=${id}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function agregar(tabla, data){
    return new Promise ((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data] , (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    }) 
}

function modificar(tabla, data){
    return new Promise ((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data] , (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    }) 
}


function eliminar(tabla,data){
    return new Promise ((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE ID= ?`, data.id , (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        })
    }) 
}


function query(tabla,consulta){
    return new Promise ((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta , (error,result)=>{
            if(error) return reject(error);
            resolve(result[0]);
        })
    }) 
}


module.exports ={
    todos,
    uno,
    agregar,
    eliminar,
    query,
    porcategoria,
    modificar,
}