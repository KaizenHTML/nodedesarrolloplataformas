const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

// La URL completa es /api/users
router.get('/', userController.findAll);

// La URL completa es /api/users/:id
router.get('/:id', userController.findById);

// La URL completa es /api/users
router.post('/', userController.create);

// La URL completa es /api/users/:id
router.put('/:id', userController.update);

// La URL completa es /api/users/:id
router.delete('/:id', userController.remove);

module.exports = router;