const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./modules/auth/routes/auth.routes');
const notesRoutes = require('./modules/notes/routes/notes.routes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware untuk menangani JSON body parsing
app.use(express.json());

// Middleware untuk CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Rute untuk otentikasi
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Notes App API!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Menjalankan server pada port yang ditentukan di .env atau default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
