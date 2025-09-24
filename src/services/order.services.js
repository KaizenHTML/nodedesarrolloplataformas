const db = require('../config/db.config');

// Obtiene todas las órdenes
exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM orders');
    return rows;
};

// Obtiene una orden por su ID
exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM orders WHERE id_order = ?', [id]);
    return rows[0];
};

// Crea una nueva orden
exports.create = async (newOrder) => {
    const { id_user, total } = newOrder;

    const [result] = await db.query(
        'INSERT INTO orders (id_user, total) VALUES (?, ?)',
        [id_user, total]
    );

    return { id_order: result.insertId, ...newOrder };
};

// Actualiza una orden existente
exports.update = async (id, updatedOrder) => {
    const { id_user, total } = updatedOrder;

    const [result] = await db.query(
        'UPDATE orders SET id_user = ?, total = ? WHERE id_order = ?',
        [id_user, total, id]
    );

    return result.affectedRows > 0;
};

// Elimina una orden
exports.remove = async (id) => {
    const [result] = await db.query('DELETE FROM orders WHERE id_order = ?', [id]);
    return result.affectedRows > 0;
};