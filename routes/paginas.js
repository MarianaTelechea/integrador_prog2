var express = require('express');
var router = express.Router();

/* Vamos a requerir el controlador */

const controllers = require('../controllers/seriesController.js');

// PAGINA 0

router.get('/', controllers.index);

// PAGINA INGRESO

router.get('/ingreso', controllers.ingreso);

// PAGINA REGISTRO

router.get('/registro', controllers.registro);

router.post('/guardar', controllers.guardado);

// PAGINA 1 

router.get('/inicio', controllers.pagina1);

// PAGINA 2 

router.get('/generos', controllers.pagina2);

// PAGINA 3

router.get('/lista-generos', controllers.pagina3);

// PAGINA 4 

router.get('/buscador', controllers.pagina4);

// PAGINA 5 

router.get('/detalle', controllers.pagina5);

// PAGINA 6 

router.get('/busc-avanzado', controllers.pagina6);

// PAGINA 7 

router.get('/favoritos', controllers.pagina7);

module.exports = router;
