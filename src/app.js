require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
<<<<<<< HEAD

const authRoutes = require('./routes/auth.routes');
const orderRoutes = require('./routes/order.routes');

// Inicializando 
=======
const inventiryRoutes = require('./routes/inventiry.routes');

>>>>>>> origin/oscar
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

<<<<<<< HEAD
// Enrutando
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

=======
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/inventories', inventiryRoutes);
>>>>>>> origin/oscar

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
