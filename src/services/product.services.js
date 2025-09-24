const db = require('../config/db.config');
const bcrypt = require('bcrypt');

// Obtiene todos los productos
exports.findAll = async () => {
    // Comunicando con la base de datos
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
};


// Obtiene un producto por su ID
exports.findById = async (id_product) => {
    const [rows] = await db.query('SELECT * FROM products WHERE id_product = ?', [id_product]);
    return rows[0];
};


// Crea un nuevo producto
exports.create = async (newProduct) => {
    // Tomando los datos de la instancia segun la tabla products
    const { 
        name,
        description,
        barcode,
        id_category
    } = newProduct;

    // La base de datos gestiona creation_date automáticamente
    const [result] = await db.query(
        'INSERT INTO products (name, description, barcode, id_category) VALUES (?, ?, ?, ?)',
        [name, description, barcode, id_category]
    );

    // Devuelve el producto con su ID generado
    return { id_product: result.insertId, ...newProduct };
};

// Actualiza un producto por su ID
exports.update = async (id_product, updatedProduct) => {
    const { 
        name,
        description,
        barcode,
        id_category
    } = updatedProduct;

    const [result] = await db.query(
        'UPDATE products SET name = ?, description = ?, barcode = ?, id_category = ? WHERE id_product = ?',
        [name, description, barcode, id_category, id_product]
    );

    // Devuelve true si se actualizó alguna fila
    return result.affectedRows > 0;
};

// Elimina un producto por su ID
exports.remove = async (id_product) => {
    const [result] = await db.query('DELETE FROM products WHERE id_product = ?', [id_product]);
    return result.affectedRows > 0;
};