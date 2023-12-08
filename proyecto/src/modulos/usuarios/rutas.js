const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./index');
const seguridad = require('./seguridad');

const router = express.Router();

//rutas para /clientes

router.get('/',seguridad(), todos);
router.get('/:id',seguridad(), uno);
router.put('/',seguridad(), eliminar);
router.post('/',seguridad(), agregar);

//funciones
async function todos(req,res, next){
    try {
        const items = await controlador.todos()
        .then((items)=>{
        respuesta.success(req, res, items, 200)
            })
    } catch (error) {
        next(error);
    }

}

async function uno(req,res, next){
    try {
        const items = await controlador.uno(req.params.id)
        .then((items)=>{
        respuesta.success(req, res, items, 200)
    })
    } catch (error) {
        next(error);
    }
    
}


async function agregar(req,res, next){
    try {
        const items = await controlador.agregar(req.body)
        if (req.body.id==0) {
            mensaje = 'Item guardado con exito'
        }else{
            mensaje = 'Item actualizado con exito'
        }

        respuesta.success(req, res, mensaje, 201)

    } catch (error) {
        // respuesta.error(req, res, error, 500)
        next(error);
    }
    
}

async function eliminar(req,res, next){
    try {
        const items = await controlador.eliminar(req.body)
        respuesta.success(req, res, 'item eliminado existosamente', 200)
    } catch (error) {
        // respuesta.error(req, res, error, 500)
        next(error);
    }
    
}


module.exports=router;
