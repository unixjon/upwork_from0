const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');


//Importamos helpers con algunas funciones

const helpers = require('./helpers');

// Crear la conexion a la base de datos

const db = require('./config/db');

//Importo el modelo
require('./models/Projects')

db.sync()
    .then(()=>console.log('DB Connected successfully'))
    .catch(err => console.log(err))

const app = express();



// Donde guardar archivos estaticos
app.use(express.static('public'));

//Habilitando PUG
app.set('view engine', 'pug');

//añadir directorio de vistas
app.set('views', path.join(__dirname,'./views'));


//pasamos el helper vardump a toda la app
app.use((req, res,next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//Habilitar bodyparser para leer el formulario
app.use(bodyParser.urlencoded({encoded:true}));

app.use('/', routes());
app.listen(3333);