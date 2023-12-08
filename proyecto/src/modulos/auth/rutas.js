const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');


const router = express.Router();

router.post('/', login)

async function login(req,res, next){
    try {
        const token = await controlador.login(req.body.usuario, req.body.password)
        //console.log(req.body)
        respuesta.success(req, res, token, 200)

    } catch (error) {
        next(error);
    }
    
}
module.exports=router;
