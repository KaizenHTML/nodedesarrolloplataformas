const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controllers');

// URL /api/orders - Obtiene todas las órdenes
router.get('/', orderController.findAll);

// URL /api/orders/:id - Obtiene una orden por su ID
router.get('/:id', orderController.findById);

// URL /api/orders - Crea una nueva orden
router.post('/', orderController.create);

// URL /api/orders/:id - Actualiza una orden existente
router.put('/:id', orderController.update);

// URL /api/orders/:id - Elimina una orden
router.delete('/:id', orderController.remove);

module.exports = router;