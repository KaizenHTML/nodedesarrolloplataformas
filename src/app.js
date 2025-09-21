require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes'); 
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const inventoryRoutes = require('./routes/inventory.routes');


// Inicializando 
const app = express();
const PORT = process.env.PORT || 3000;

// Parseando
app.use(express.json());

// Enrutando a user.routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);

// Inicializando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});