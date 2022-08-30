'use strict';
var dbConn = require('./../../config/db.config');
//Cliente object create
var Cliente = function (cliente) {
    this.nombre = cliente.nombre;
    this.ci = cliente.ci;
    this.direccion = cliente.direccion;
    this.telefono = cliente.telefono;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Cliente.create = function (newHab, result) {
    dbConn.query("INSERT INTO clientes set ?", newHab, function (err, res) {
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

Cliente.findById = function (id, result) {
    dbConn.query("Select * from clientes where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};

Cliente.findAll = function (result) {
    dbConn.query("Select * from clientes", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('clientes : ', res);
            result(null, res);
        }
    });
};

Cliente.update = function (id, cliente, result) {
    dbConn.query("UPDATE clientes SET nombre=?,ci=?,direccion=?,telefono=?,updated_at=? WHERE id = ?",
        [cliente.nombre, cliente.ci, cliente.direccion, cliente.telefono, new Date(), id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

Cliente.delete = function (id, result) {
    dbConn.query("DELETE FROM clientes WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
module.exports = Cliente;