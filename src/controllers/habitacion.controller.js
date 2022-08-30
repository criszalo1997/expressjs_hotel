'use strict';
const Habitacion = require('../models/habitacion.model');
exports.findAll = function (req, res) {
    Habitacion.findAll(function (err, habitacion) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', habitacion);
        res.send(habitacion);
    });
};
exports.create = function (req, res) {
    const new_habitacion = new Habitacion(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    } else {
        Habitacion.create(new_habitacion, function (err, habitacion) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "habitacion añadida correctamente!", data: habitacion });
        });
    }
};

exports.findById = function (req, res) {
    Habitacion.findById(req.params.id, function (err, habitacion) {
        if (err)
            res.send(err);
        res.json(habitacion);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    } else {
        Habitacion.update(req.params.id, new Habitacion(req.body), function (err, habitacion) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'habitacion actualizada correctamente!' });
        });
    }
};
exports.delete = function (req, res) {
    Habitacion.delete(req.params.id, function (err, habitacion) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Habitacion eliminada correctamente' });
    });
};