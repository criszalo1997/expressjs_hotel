const express = require('express')
const router = express.Router()
const habitacionController = require('../controllers/habitacion.controller');
// retornar todas las habitaciones
router.get('/', habitacionController.findAll);
// crear nueva habitacion
router.post('/', habitacionController.create);
// regresar una habitacion con id
router.get('/:id', habitacionController.findById);
// actualizar un habitacion con id
router.put('/:id', habitacionController.update);
// eliminar una habitacion con id
router.delete('/:id', habitacionController.delete);
module.exports = router
