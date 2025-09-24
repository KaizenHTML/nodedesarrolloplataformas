const db = require('../config/db.config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.register = async (userData) => {
    const { cc, name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, password } = userData;

    // Verificar si el usuario ya existe por email o cc
    const [existingUser] = await db.query('SELECT id_users FROM users WHERE email = ? OR cc = ?', [email, cc]);
    if (existingUser.length > 0) {
        throw new Error('El usuario con este correo o número de identificación ya existe.');
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    const [result] = await db.query(
        'INSERT INTO users (cc, name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [cc, name1, name2, lastname1, lastname2, email, phone1, phone2, date_of_birth, hashedPassword]
    );

    // Devolver el ID del usuario creado
    return { id_users: result.insertId };
};

// Función para iniciar sesión
exports.login = async (email, password) => {
    // Buscar el usuario por email
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    // Comparar la contraseña ingresada con la encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }

    // Crear un token de acceso
    const token = jwt.sign({ id: user.id_users }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Eliminar la contraseña del objeto de usuario antes de devolverlo
    delete user.password;
    
    return { token, user };
};