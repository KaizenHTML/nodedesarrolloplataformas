const productService = require('../services/product.services');
const errorHandler = require('../middleware/errorHandler');

// Obtiene todos los productos
exports.findAll = errorHandler(async (req, res) => {
    const products = await productService.findAll();
    res.status(200).json(products);
});

// Obtiene un producto por su ID
exports.findById = errorHandler(async (req, res) => {
    const product = await productService.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
}); 

// Crea un nuevo producto
exports.create = errorHandler(async (req, res) => {
    const newProduct = await productService.create(req.body);
    res.status(201).json(newProduct);
}); 

// Actualiza un producto existente
exports.update = errorHandler(async (req, res) => {
    const updated = await productService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto actualizado con éxito" });
});

// Elimina un producto
exports.remove = errorHandler(async (req, res) => {
    const removed = await productService.remove(req.params.id);
    if (!removed) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto eliminado con éxito" });
});