const inventoryService = require('../services/inventiry.services');
const errorHandler = require('../middleware/errorHandler');

// Obtiene todos los inventarios
exports.findAll = errorHandler(async (req, res) => {
    const inventories = await inventoryService.findAll();
    res.status(200).json(inventories);
});

// Obtiene un inventario por su ID
exports.findById = errorHandler(async (req, res) => {
    const inventory = await inventoryService.findById(req.params.id);
    if (!inventory) {
        return res.status(404).json({ message: "Inventario no encontrado" });
    }
    res.status(200).json(inventory);
}); 

// Crea un nuevo inventario
exports.create = errorHandler(async (req, res) => {
    const newinventory = await inventoryService.create(req.body);
    res.status(201).json(newinventory);
}); 

// Actualiza un inventario existente
exports.updateQuantity = errorHandler(async (req, res) => {
    const updated = await inventoryService.updateQuantity(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "Inventario no encontrado" });
    }
    res.status(200).json({ message: "Inventario actualizado con éxito" });
});

// Elimina un inventario
exports.remove = errorHandler(async (req, res) => {
    const removed = await inventoryService.remove(req.params.id);
    if (!removed) {
        return res.status(404).json({ message: "Inventario no encontrado" });
    }
    res.status(200).json({ message: "Inventario eliminado con éxito" });
}); 