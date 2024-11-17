const sequelize = require('./database');  // Koneksi ke database
const { generateToken, verifyToken } = require('./jwt');  // JWT
const { verifyAuth, validateRole } = require('./middlewares');  // Middleware umum

module.exports = {
  sequelize,
  generateToken,
  verifyToken,
  verifyAuth,
  validateRole
};
