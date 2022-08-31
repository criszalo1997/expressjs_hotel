'use strict';
//console.log(process.env)
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: process.env.DATABASE_HOST, //cambiar por su host
    user: process.env.DATABASE_USER, //cambiar por su usuario
    password: process.env.DATABASE_PASS, //cambiar por su contraseña
    database: process.env.DATABASE_NAME, //cambiar por su base de datos
    port: 3307
});
dbConn.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;