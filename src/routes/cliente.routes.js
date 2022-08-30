const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/cliente.controller');
// retornar todas los clientes
router.get('/', clienteController.findAll);
// crear nueva cliente
router.post('/', clienteController.create);
// regresar una cliente con id
router.get('/:id', clienteController.findById);
// actualizar un cliente con id
router.put('/:id', clienteController.update);
// eliminar una cliente con id
router.delete('/:id', clienteController.delete);
module.exports = router
