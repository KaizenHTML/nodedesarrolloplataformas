const express = require('express');
// Permitiendo agrupar rutas
const router = express.Router();
const inventiryController = require('../controllers/inventiry.controllers');


// URL /api/inventiries
router.get('/', inventiryController.findAll);

// URL /api/inventiries/:id
router.get('/:id', inventiryController.findById);

// URL /api/inventiries
router.post('/', inventiryController.create);

// URL /api/inventiries/:id
router.put('/:id', inventiryController.updateQuantity);

// URL /api/inventiries/:id
router.delete('/:id', inventiryController.remove);

module.exports = router;