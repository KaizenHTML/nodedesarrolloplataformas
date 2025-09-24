const authService = require('../services/auth.services');
const errorHandler = require('../middleware/errorHandler');

// Controlador para el registro de usuarios
exports.register = errorHandler(async (req, res) => {
    const newUser = await authService.register(req.body);
    res.status(201).json({
        message: 'Usuario registrado exitosamente',
        user: newUser
    });
});

// Controlador para el inicio de sesión
exports.login = errorHandler(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        user
    });
});