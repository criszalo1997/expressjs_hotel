require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const host = process.env.NODE_DOCKER_HOST || "localhost";
const port = process.env.NODE_DOCKER_PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    res.send("Api Hotel");
});
// rutas habitaciones
const habitacionesRutas = require('./src/routes/habitacion.routes')
// usando un middleware
app.use('/api/v1/habitaciones', habitacionesRutas)

// rutas clientes
const clientesRutas = require('./src/routes/cliente.routes')
// usando un middleware
app.use('/api/v1/clientes', clientesRutas)

// rutas reservas
const reservasRutas = require('./src/routes/reserva.routes')
// usando un middleware
app.use('/api/v1/reservas', reservasRutas)





// listar peticiones
app.listen(port, host);