const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./modules/auth/routes/auth.routes');
const { globalErrorHandler } = require('./utils/error.util'); // Middleware error handler

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Keluar jika koneksi database gagal
  }
})();

// Gunakan rute auth
app.use('/api/auth', authRoutes);

// Route utama
app.get('/', (req, res) => {
  res.send('Welcome to Collaborative Learning Platform API!');
});

// Global Error Handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
