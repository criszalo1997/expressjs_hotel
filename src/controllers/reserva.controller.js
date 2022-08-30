'use strict';
const Reserva = require('../models/reserva.model');
const METODOS = [
    "EFECTIVO", "TARJETA", "CHEQUE"
]
const ESTADOS = [
    "PENDIENTE", "PAGADO", "ELIMINADO"
]
exports.findAll = function (req, res) {
    Reserva.findAll(function (err, reserva) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', reserva);
        res.send(reserva);
    });
};

exports.findAlldelete = function (req, res) {
    Reserva.findAlldelete(function (err, reserva) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', reserva);
        res.send(reserva);
    });
};
exports.create = function (req, res) {
    const new_reserva = new Reserva(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    }else if (METODOS.indexOf(req.body.met_pago.toUpperCase()) == -1) {
        res.status(400).send({ error: true, message: 'Por favor agregar un metodo de pago valido' });
    }
    else if (ESTADOS.indexOf(req.body.estado.toUpperCase()) == -1) {
        res.status(400).send({ error: true, message: 'Por favor agregar un estado valido' });
    }
    else {
        Reserva.create(new_reserva, function (err, reserva) {
            if (err){
                res.status(400).send({ error: true, message: err });
            }
            else if (reserva != null) {
                res.json({ error: false, message: "reserva añadido correctamente!", data: reserva });    
            }else{
                res.json({ error: true, message: "error al agregar reserva habitacion ocupada o no disponible!", data: reserva });
            }
            
        });
    }
};

exports.verifyRoom = function (req, res) {
    Reserva.verifyRoom(req.params.id, function (err, reserva) {
        if (err)
            res.send(err);
        res.json(reserva);
    });
};

exports.findById = function (req, res) {
    Reserva.findById(req.params.id, function (err, reserva) {
        if (err)
            res.send(err);
        res.json(reserva);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    } else {
        Reserva.update(req.params.id, new Reserva(req.body), function (err, reserva) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'reserva actualizada correctamente!' });
        });
    }
};

exports.delete = function (req, res) {
    Reserva.delete(req.params.id, function (err, reserva) {
        if (err){
            res.send(err);
        }else if (reserva > 0) {
            res.json({ error: false, message: 'Reserva eliminada correctamente' });
        }else{
            res.status(400).send({ error: true, message: 'Reserva no eliminada fuera de rango' });
        }
            
    });
};