const db = require('../config/db.config');
const bcrypt = require('bcrypt');

// Obteniendo usuarios
exports.findAll = async () => {
    // Comunicando con la base de datos
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};


// Obteniendo usuarios por su CC
exports.findById = async (cc) => {
    const [rows] = await db.query('SELECT * FROM users WHERE cc = ?', [cc]);
    return rows[0];
};


// Creando un nuevo usuario 
exports.create = async (newUser) => {
    // Tomando los datos de la instancia segun la tabla users
    const { 
        cc,
        name1,
        name2,
        lastname1,
        lastname2,
        email,
        phone1,
        phone2,
        date_of_birth,
        password
    } = newUser;

    // Encriptando la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertando los datos en la DB
    const [result] = await db.query(
        'INSERT INTO users (cc, name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cc, name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, hashedPassword]
    );

    // Devolviendo la instancia con un ID
    return { id: result.insertId, ...newUser };
};

// Actualizando usuarios por su cc
exports.update = async (cc, updatedUser) => {
    // Actualizando los datos
    const { name1, 
        name2, 
        lastname1, 
        lastname2, 
        email, 
        phone1, 
        phone2, 
        date_of_birth, 
        password 
    } = updatedUser;

    const [result] = await db.query(
        'UPDATE users SET name1 = ?, name2 = ?, lastname1 = ?, lastname2 = ?, email = ?, phone1 = ?, phone2 = ?, date_of_birth = ?, password = ? WHERE cc = ?',
        [name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, password, cc]
    );

    // Devolviendo si se actualizo una fila
    return result.affectedRows > 0;
};

// Eliminando usuario por su cc
exports.remove = async (cc) => {
    // Eliminando un usuario
    const [result] = await db.query('DELETE FROM users WHERE cc = ?', [cc]);

    // Devolviendo si se elimino una fila
    return result.affectedRows > 0;
};