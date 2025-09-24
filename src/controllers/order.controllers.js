const orderService = require('../services/order.services');
const errorHandler = require('../middleware/errorHandler');

// Obtiene todas las órdenes
exports.findAll = errorHandler(async (req, res) => {
    const orders = await orderService.findAll();
    res.status(200).json(orders);
});

// Obtiene una orden por su ID
exports.findById = errorHandler(async (req, res) => {
    const order = await orderService.findById(req.params.id);
    if (!order) {
        return res.status(404).json({
            message: "Orden no encontrada"
        });
    }
    res.status(200).json(order);
});

// Crea una nueva orden
exports.create = errorHandler(async (req, res) => {
    const newOrder = await orderService.create(req.body);
    res.status(201).json(newOrder);
});

// Actualiza una orden existente
exports.update = errorHandler(async (req, res) => {
    const updated = await orderService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({
            message: "Orden no encontrada"
        });
    }
    res.status(200).json({
        message: "Orden actualizada exitosamente"
    });
});

// Elimina una orden
exports.remove = errorHandler(async (req, res) => {
    const removed = await orderService.remove(req.params.id);
    if (!removed) {
        return res.status(404).json({
            message: "Orden no encontrada"
        });
    }
    res.status(200).json({
        message: "Orden eliminada exitosamente"
    });
});