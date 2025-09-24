const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

// Ruta para el registro de un nuevo usuario
router.post('/register', authController.register);

// Ruta para el inicio de sesión
router.post('/login', authController.login);

module.exports = router;