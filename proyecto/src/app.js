const express = require('express');
const config = require('./config');
const morgan = require('morgan')
const usuarios = require('./modulos/usuarios/rutas')
const productos = require('./modulos/productos/rutas')
const auth = require('./modulos/auth/rutas')
const app  = express();
const error = require('./red/errors')

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/usuarios', usuarios)
app.use('/productos', productos)
app.use('/auth', auth)
app.use(error)

module.exports = app;