'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: 'localhost', //cambiar por su host
    user: 'soporte', //cambiar por su usuario
    password: 'insertec1.', //cambiar por su contraseña
    database: 'prueba_tecnica' //cambiar por su base de datos
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;