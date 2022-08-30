'use strict';
var dbConn = require('./../../config/db.config');
//Habitacion object create
var Habitacion = function (habitacion) {
    this.numero = habitacion.numero;
    this.estado = habitacion.estado ? habitacion.estado : 'Disponible';
    this.tipo = habitacion.tipo;
    this.camas = habitacion.camas;
    this.precio = habitacion.precio;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Habitacion.create = function (newHab, result) {
    dbConn.query("INSERT INTO habitaciones set ?", newHab, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

Habitacion.findById = function (id, result) {
    dbConn.query("Select * from habitaciones where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Habitacion.findAll = function (result) {
    dbConn.query("Select * from habitaciones", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('habitaciones : ', res);
            result(null, res);
        }
    });
};

Habitacion.update = function (id, habitacion, result) {
    dbConn.query("UPDATE habitaciones SET numero=?,estado=?,tipo=?,camas=?,precio=?,updated_at=? WHERE id = ?",
        [habitacion.numero, habitacion.estado, habitacion.tipo, habitacion.camas,
        habitacion.precio, new Date(), id], function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Habitacion.delete = function (id, result) {
    dbConn.query("DELETE FROM habitaciones WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Habitacion;