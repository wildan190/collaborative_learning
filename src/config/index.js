const dotenv = require('dotenv');

// Mengambil environment variables dari file .env
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',  // Default 1 hour
};
