const db = require('../config/db.config');
const bcrypt = require('bcryptjs'); // Importamos la librería para encriptar contraseñas

// Obteniendo usuarios
exports.findAll = async () => {

    // Comunicando con la base de datos
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};


// Obteniendo usuarios por su ID
exports.findById = async (id) => {

    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};


// Creando usuarios
exports.create = async (newUser) => {
    // Tomando los datos de la instancia
    const { nombre, email, password, acepto_terminos } = newUser;

    // Encriptando la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertando los datos en la DB
    const [result] = await db.query(
        'INSERT INTO users (nombre, email, password, acepto_terminos) VALUES (?, ?, ?, ?)',
        [nombre, email, hashedPassword, acepto_terminos]
    );

    // Devolviendo la instancia con un ID
    return { id: result.insertId, ...newUser };
};

// Actualizando usuarios
exports.update = async (id, updatedUser) => {
    // Actualizando los datos
    const { nombre, email, password, acepto_terminos } = updatedUser;

    const [result] = await db.query(
        'UPDATE users SET nombre = ?, email = ?, password = ?, acepto_terminos = ? WHERE id = ?',
        [nombre, email, password, acepto_terminos, id]
    );

    // Devolviendo si se actualizo una fila
    return result.affectedRows > 0;
};

// Eliminando usuario
exports.remove = async (id) => {
    // Eliminando un usuario
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    
    // Devolviendo si se elimino una fila
    return result.affectedRows > 0;
};