const express = require('express');
const router = express.Router();

//importamos express validator
const { body }= require('express-validator/check');

//Importamos el controlador
const proyectosHome = require('../controllers/proyectosController')
module.exports = function () {
    //ruta para el home
    router.get('/', proyectosHome.proyectosHome);
    router.get('/new-project', proyectosHome.formproject);
    router.post('/new-project', 
        body('name').not().isEmpty().trim().escape(),
        proyectosHome.newproject);


    router.get('/projects/:url', proyectosHome.projectByUrl);
    router.get('/projects/edit/:id', proyectosHome.editform);


    return router;
}