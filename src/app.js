require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');

const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');

// Inicializando 
const app = express();
const PORT = process.env.PORT || 3000;

// Parseando
app.use(express.json());

// Enrutando
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);


// Inicializando
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});