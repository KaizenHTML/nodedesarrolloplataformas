// Importando biblioteca 
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida correctamente.');
        connection.release(); // Libera la conexión
    } catch (err) {
        console.error('No se pudo conectar a la base de datos:', err.message);
        process.exit(1); // Sale de la aplicación si no se puede conectar
    }
};

testConnection();

module.exports = pool;