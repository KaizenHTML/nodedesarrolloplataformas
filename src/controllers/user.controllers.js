const userService = require('../services/user.services');

const errorHandler = require('../middleware/errorHandler');

// Obtiene todos los usuarios
exports.findAll = errorHandler(async (req, res) => {
    const users = await userService.findAll();
    res.status(200).json(users);
});

// Obtiene un usuario por su ID
exports.findById = errorHandler(async (req, res) => {
    const user = await userService.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
});

// Crea un nuevo usuario
exports.create = errorHandler(async (req, res) => {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
});

// Actualiza un usuario existente
exports.update = errorHandler(async (req, res) => {
    const updated = await userService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
});

// Elimina un usuario
exports.remove = errorHandler(async (req, res) => {
    const removed = await userService.remove(req.params.id);
    if (!removed) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
});


//