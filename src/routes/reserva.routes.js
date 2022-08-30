const express = require('express')
const router = express.Router()
const reservaController = require('../controllers/reserva.controller');
// retornar todas las habitaciones
router.get('/', reservaController.findAll);
// retornar todas las habitaciones ELIMINADAS
router.get('/eliminadas/', reservaController.findAlldelete);
// crear nueva habitacion
router.post('/', reservaController.create);
// regresar una habitacion con id
router.get('/:id', reservaController.findById);
// actualizar un habitacion con id
router.put('/:id', reservaController.update);
// eliminar una habitacion con id
router.delete('/:id', reservaController.delete);

router.get('/verificar_hab/:id', reservaController.verifyRoom);

module.exports = router
