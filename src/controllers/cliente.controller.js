'use strict';
const Cliente = require('../models/cliente.model');
exports.findAll = function (req, res) {
    Cliente.findAll(function (err, cliente) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', cliente);
        res.send(cliente);
    });
};
exports.create = function (req, res) {
    const new_cliente = new Cliente(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    } else {
        Cliente.create(new_cliente, function (err, cliente) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "cliente añadido correctamente!", data: cliente });
        });
    }
};

exports.findById = function (req, res) {
    Cliente.findById(req.params.id, function (err, cliente) {
        if (err)
            res.send(err);
        res.json(cliente);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Por favor proveedor todos los campos' });
    } else {
        Cliente.update(req.params.id, new Cliente(req.body), function (err, cliente) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'cliente actualizado correctamente!' });
        });
    }
};
exports.delete = function (req, res) {
    Cliente.delete(req.params.id, function (err, cliente) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'Cliente eliminada correctamente' });
    });
};