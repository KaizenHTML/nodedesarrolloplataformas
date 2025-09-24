require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user.routes');
const inventiryRoutes = require('./routes/inventiry.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
app.use('/api/inventories', inventiryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
