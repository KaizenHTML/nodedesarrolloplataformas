const db = require('../config/db.config');
const bcrypt = require('bcrypt');

// Obteniendo inventarios
exports.findAll = async () => {
    // Comunicando con la base de datos
    const [rows] = await db.query('SELECT * FROM inventories');
    return rows;
};


// Obteniendo inventario por su ID
exports.findById = async (id_product) => {
    const [rows] = await db.query('SELECT * FROM inventories WHERE id_product = ?', [id_product]);
    return rows[0];
};


// Creando un nuevo inventario
exports.create = async (newinventories) => {
    // Tomando los datos de la instancia segun la tabla inventories
    const { 
        id_product,
        current_quantity,
        minimum_quantity
    } = newinventories;

    //La base de datos automaticamente se encarga de last_update
    const [result] = await db.query(
        'INSERT INTO inventories (id_product, current_quantity, minimum_quantity) VALUES (?, ?, ?)',
        [id_product, current_quantity, minimum_quantity]
    );

    // Devolviendo la instancia con un ID
    return { id: result.insertId, ...newinventories };
};

// Actualizando inventario por su ID
exports.updateQuantity = async (id_product, updatedQuantity) => {
    // Actualizando los datos
    const { current_quantity } = updatedQuantity;
    const [result] = await db.query(
        'UPDATE inventories SET current_quantity = ? WHERE id_product = ?',
        [current_quantity, id_product]
    );

    return result.affectedRows > 0;
};

// Eliminando inventario por su ID
exports.remove = async (id_product) => {
    // Eliminando un inventario
    const [result] = await db.query('DELETE FROM inventories WHERE id_product = ?', [id_product]);

    // Devolviendo si se elimino una fila
    return result.affectedRows > 0;
};
