import express from "express";
import router from "./routes/router.js";
import db from "./config/db.js";

db.authenticate()
    .then(() => console.log('Conexión exitosa a a la DB...'))
    .catch(error => console.log(error));

const app = express();

// Habilitar Template Engine
app.set('view engine', 'pug');
// app.set('views', __dirname + '/views');

// POST. Urlencoded forms
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Middleware propio
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

// Public
app.use(express.static('public'));

// Routes
app.use('/', router);
app.use('/contacto', router);
app.use('/nosotros', router);

// Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('App listening on port '+ port));