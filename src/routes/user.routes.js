const express = require('express');

// Permitiendo agrupar rutas
const router = express.Router();

const userController = require('../controllers/user.controllers');


// URL /api/users
router.get('/', userController.findAll);

// URL /api/users/:id
router.get('/:id', userController.findById);

// URL /api/users
router.post('/', userController.create);

// URL /api/users/:id
router.put('/:id', userController.update);

// URL /api/users/:id
router.delete('/:id', userController.remove);

module.exports = router;