// const db = require('../../DB/mysql');

const TABLA = 'productos'
module.exports = function(dbInyectada){ 

    let db = dbInyectada;
    
    if(!db){
        db=require('../../DB/mysql');
    }

    function todos(){
        return db.todos(TABLA);
    }
    
    function uno(id){
        return db.uno(TABLA, id);
    }

    function porcategoria(categoria){
        return db.porcategoria(TABLA, categoria);
    }
    
    function eliminar(body){
        return db.eliminar(TABLA, body);
    }
    
    function agregar(body){
        return db.agregar(TABLA, body);
    }


    function modificar(body){
        return db.modificar(TABLA, body);
    }

    return{
        todos,
        uno,
        agregar,
        eliminar,
        porcategoria,
        modificar,
    }
}