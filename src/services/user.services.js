const db = require('../config/db.config');
const bcrypt = require('bcryptjs'); // Importamos la librería para encriptar contraseñas

// Función para obtener todos los usuarios
exports.findAll = async () => {
    // La capa de servicios se comunica con la base de datos
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

// Función para obtener un usuario por su ID
exports.findById = async (id) => {
    // La capa de servicios se comunica con la base de datos
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Función para crear un nuevo usuario
exports.create = async (newUser) => {
    // Extraemos los datos del objeto de usuario
    const { nombre, email, password, acepto_terminos } = newUser;

    // OPTIMIZACIÓN DE SEGURIDAD: Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertamos los datos en la base de datos, usando la contraseña encriptada
    const [result] = await db.query(
        'INSERT INTO users (nombre, email, password, acepto_terminos) VALUES (?, ?, ?, ?)',
        [nombre, email, hashedPassword, acepto_terminos]
    );

    // Devolvemos el objeto del nuevo usuario con el ID asignado por la base de datos
    return { id: result.insertId, ...newUser };
};

// Función para actualizar un usuario
exports.update = async (id, updatedUser) => {
    // Lógica para actualizar los datos en la base de datos
    const { nombre, email, password, acepto_terminos } = updatedUser;

    const [result] = await db.query(
        'UPDATE users SET nombre = ?, email = ?, password = ?, acepto_terminos = ? WHERE id = ?',
        [nombre, email, password, acepto_terminos, id]
    );

    // Devolvemos true si se actualizó una fila
    return result.affectedRows > 0;
};

// Función para eliminar un usuario
exports.remove = async (id) => {
    // Lógica para eliminar un registro de la base de datos
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    
    // Devolvemos true si se eliminó una fila
    return result.affectedRows > 0;
};