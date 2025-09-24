const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');


// URL/api/products
router.get('/', productController.findAll);

// URL /api/products/:id
router.get('/:id', productController.findById);


// URL /api/products
router.post('/', productController.create);

//URL /api/products/:id
router.put('/:id', productController.update);

// URL /api/products/:id
router.delete('/:id', productController.remove);

module.exports = router;