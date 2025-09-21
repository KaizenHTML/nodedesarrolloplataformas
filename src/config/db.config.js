const mysql = require('mysql2/promise');

// Cargando las variables de entorno
require('dotenv').config();


// Creando un grupo de conexiones 
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Controlando errores
connection.on('error', err => {
    console.error('Error de conexión a la base de datos:', err);
});

//Exportando la instancia  
module.exports = connection;